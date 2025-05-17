import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  CameraView,
  CameraCapturedPicture,
  useCameraPermissions,
} from "expo-camera";
import { BlurView } from "expo-blur";
import { usePhotoStore } from '../app/stores/ImageStores';
import { useRouter } from "expo-router";
import FooterNavigation from '../components/FooterNavigation';

export default function CameraScreen(): React.JSX.Element {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setPhotoUri } = usePhotoStore();

  useEffect(() => {
    if (permission?.status !== "granted") {
      requestPermission();
    }
  }, [permission]);

  const sendPhotoToServer = async (photoUri: string): Promise<void> => {
    const formData = new FormData();
    formData.append("image", {
      uri: photoUri,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);


    try {
      const response = await fetch("http://192.168.0.4:5000/analyze", {
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
      }
      else {
        console.log("error")
      }


    } catch (error) {
      console.error("서버 전송 실패:", error);
      alert("서버와의 연결 중 오류가 발생했습니다.");
    }
  };

  const takePhoto = async (): Promise<void> => {
    if (cameraRef.current && !photoTaken) {
      const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync();
      console.log("📸 사진 URI:", photo.uri);
      setPhotoTaken(true);
      setPhotoUri(photo.uri);
      await sendPhotoToServer(photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        zoom={1}
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
              {photoTaken ? "이미 촬영됨" : "촬영"}
            </Text>
          </TouchableOpacity>
        )}
      <FooterNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  captureButton: {
    backgroundColor: "#fff",               
    width: 80,
    height: 50,
    borderRadius: 10,                      
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",                 
    bottom: 120,                           
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#2e4010",
    zIndex: 1,
  },
  disabledButton: { backgroundColor: "#999" },
  captureText: {
    color: "#2e4010",
    fontFamily: "ChangwonDangamRound",
    fontWeight: "bold",
    fontSize: 16,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    width: "100%",
  },
  footerItem: {
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  footerText: {
    fontFamily: "ChangwonDangamRound",
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
  },
  guideModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    zIndex: 10,
  },
  guideImage: {
    width: 250,
    height: 180,
    resizeMode: "contain",
    marginBottom: 30,
  },
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#2e4010",
    borderRadius: 6,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
  },
  guideText: {
    fontSize: 18,
    fontFamily: "ChangwonDangamRound",
    color: "#fff",
    textAlign: "center",
    marginVertical: 10,
    lineHeight: 26,
    paddingHorizontal: 10,
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
