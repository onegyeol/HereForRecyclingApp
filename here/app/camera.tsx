import { BlurView } from "expo-blur";
import 'react-native-get-random-values';
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, BackHandler} from "react-native";
import { usePhotoStore } from '../app/stores/ImageStores';
import FooterNavigation from '../components/FooterNavigation';
import { useFocusEffect } from '@react-navigation/native';
import {v4 as uuidv4} from 'uuid';


export default function CameraScreen(): React.JSX.Element {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setPhotoUri, setResultUUID } = usePhotoStore();
  const navigation = useNavigation();

  useEffect(() => {
    if (permission?.status !== "granted") {
      requestPermission();
    }
  }, [permission]);

  const sendPhotoToServer = async (photoUri: string): Promise<void> => {
    const uuid = uuidv4();
    console.log("UUID:", uuid);

    const formData = new FormData();
    formData.append("uuid", uuid);
    formData.append("image", {
      uri: photoUri,
      name: "photo.jpg",
      type: "image/jpeg",
    }as any);
    
    try {
      setIsLoading(true);
      
      const response = await fetch("https://07da-117-16-153-63.ngrok-free.app/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setResultUUID(uuid); 
        setIsLoading(false); 
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
      console.log("사진 URI:", photo.uri);
      setPhotoTaken(true);
      setPhotoUri(photo.uri);
      await sendPhotoToServer(photo.uri);
    }
  };

  // 안드로이드 뒤로가기 차단
  useFocusEffect(
    React.useCallback(() => {
      setPhotoTaken(false); 
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        return isLoading;
      });
  
      return () => backHandler.remove();
    }, [isLoading])
  );
  

  // ios 뒤로가기 제스쳐 차단
  useEffect(() => {
    navigation.setOptions?.({ gestureEnabled: !isLoading });
  }, [isLoading]);

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
            disabled={isLoading}
          >
            <Text style={styles.captureText}>
              {photoTaken && isLoading ? "촬영됨" : "촬영"}
            </Text>
          </TouchableOpacity>
        )}
      <FooterNavigation disabled={isLoading}/>
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
