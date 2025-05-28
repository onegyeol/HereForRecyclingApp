import { BlurView } from "expo-blur";
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Linking
} from "react-native";
import { usePhotoStore } from '../app/stores/ImageStores';
import FooterNavigation from '../components/FooterNavigation';

export default function CameraScreen(): React.JSX.Element {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setPhotoUri } = usePhotoStore();

  useEffect(() => {
    if (!permission) return;

    if (permission.status === 'granted') {
    setShowPermissionModal(false);
  } else {
    setShowPermissionModal(true);
  }
}, [permission?.status]);

  const handleRequestPermission = async () => {
  const result = await requestPermission();

  if (result.granted) {
    // 권한 허용됨
    setShowPermissionModal(false);
  } else {
    // 권한 거절 -> 설정으로 이동
    Linking.openSettings(); 
  }
};

  const sendPhotoToServer = async (photoUri: string): Promise<void> => {
    const formData = new FormData();
    formData.append("image", {
      uri: photoUri,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);

    try {
      setIsLoading(true);

      const response = await fetch("https://fb2d-117-16-153-63.ngrok-free.app/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const result = await response.json();
      console.log("분석 결과:", result);

      if (response.ok) {
        router.push("/result");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("서버 전송 실패:", error);
      alert("서버와의 연결 중 오류가 발생했습니다.");
    }
  };

  const takePhoto = async (): Promise<void> => {
    if (cameraRef.current && !photoTaken) {
      const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync();
      console.log("사진 URI:", photo.uri);
      setPhotoTaken(true);
      setPhotoUri(photo.uri);
      await sendPhotoToServer(photo.uri);
    }
  };

  if (!permission || permission.status !== 'granted') {
  return (
    <View style={styles.container}>
      <Modal
        visible={showPermissionModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.permissionText}>카메라 권한이 필요합니다.</Text>
            <TouchableOpacity onPress={handleRequestPermission} style={styles.permissionButton}>
              <Text style={styles.permissionButtonText}>권한 허용</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ flex: 1 }} />

      <FooterNavigation />
    </View>
  );
}


  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        zoom={Platform.OS === 'ios' ? 0.2 : 0}
        ref={cameraRef}
        facing="back"
        ratio="4:3"
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <Image
              source={require('../assets/images/loading.gif')}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.loadingText}>분석 중입니다...</Text>
          </View>
        </View>
      )}

      {showGuide && (
        <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill}>
          <View style={styles.guideModal}>
            <Image
              source={require("../assets/images/guide.jpg")}
              style={styles.guideImage}
            />
            <Text style={styles.guideText}>
              정확한 분류를 위해{"\n"}위 사진과 같이 촬영해 주세요!
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowGuide(false)}
            >
              <Text style={styles.closeText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      )}

      {!showGuide && (
        <TouchableOpacity
          onPress={takePhoto}
          style={[styles.captureButton, photoTaken && styles.disabledButton]}
          disabled={photoTaken}
        >
          <Text style={styles.captureText}>
            {photoTaken ? "촬영됨" : "촬영"}
          </Text>
        </TouchableOpacity>
      )}
      <FooterNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  permissionText: { fontSize: 18, marginBottom: 20, color: '#333', fontFamily: 'ChangwonDangamRound', textAlign: 'center' },
  permissionButton: { padding: 12, backgroundColor: '#2e4010', borderRadius: 6 },
  permissionButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', fontFamily: 'ChangwonDangamRound' },
  camera: { flex: 1 },
  captureButton: {
    backgroundColor: "#fff",
    width: 80,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 150,
    alignSelf: "center",
  },
  disabledButton: { backgroundColor: "#999" },
  captureText: {
    color: "#2e4010",
    fontFamily: "ChangwonDangamRound",
    fontWeight: "bold",
    fontSize: 20,
  },
  guideModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  guideImage: {
    width: 290,
    height: 220,
    resizeMode: "contain",
    marginBottom: 30,
  },
  closeButton: {
    paddingHorizontal: 25,
    paddingVertical: 13,
    backgroundColor: "#2e4010",
    borderRadius: 6,
    margin: 20
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
  },
  guideText: {
    fontSize: 20,
    fontFamily: "ChangwonDangamRound",
    color: "#fff",
    textAlign: "center",
    marginVertical: 10,
    lineHeight: 26,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ChangwonDangamRound',
  },
});
