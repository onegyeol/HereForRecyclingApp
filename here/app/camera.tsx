import { BlurView } from "expo-blur";
import 'react-native-get-random-values';
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, BackHandler} from "react-native";
import { usePhotoStore } from '../app/stores/ImageStores';
import FooterNavigation from '../components/FooterNavigation';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {v4 as uuidv4} from 'uuid';


export default function CameraScreen(): React.JSX.Element {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setPhotoUri, setResultUUID } = usePhotoStore();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [errorMsg, setErrorMsg] = useState("");

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
  
      const response = await fetch("https://herefornetzero.com/analyze", {
        method: "POST",
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
        setIsLoading(false);
        router.push("/main");
      }


    } catch (error) {
      // console.error("서버 전송 실패:", error);
      setIsLoading(false);
      setErrorMsg("네트워크 연결이 불안정합니다.\n다시 시도해주세요.");
    }
  };

  const takePhoto = async (): Promise<void> => {
    if (cameraRef.current && !photoTaken && !isLoading) {
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

  if (!permission) {
  return <View style={styles.container} />;
}

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        key={permission?.granted ? 'camera-enabled' : 'camera-disabled'}
        style={styles.camera}
        active={isFocused && !isLoading}
        onMountError={(e) => console.warn('Camera mount error:', e)}
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
      {errorMsg !== "" && (
        <View style={styles.errorOverlay} pointerEvents="auto">
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMsg}</Text>
            <TouchableOpacity
              style={styles.errorCloseButton}
              onPress={() => setErrorMsg("")} 
            >
              <Text style={styles.errorCloseText}>닫기</Text>
            </TouchableOpacity>
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
              정확한 인식을 위해{"\n"}위 사진과 같이 쓰레기를{"\n"}분리해 촬영해 주세요!{"\n"}{"\n"}
              <Text style={{ fontSize: 14 }}>
                ※ AI 모델이 모든 사물을 인식하는 것에는{"\n"}한계가 있어 결과가 부정확할 수 있어요. ※
              </Text>
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
    width: 85,
    height: 55,
    borderRadius: 10,                     
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",                 
    bottom: 155,                           
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#2e4010",
  },
  disabledButton: { backgroundColor: "#999" },
  captureText: {
    color: "#2e4010",
    fontFamily: "ChangwonDangamRound",
    fontSize: 20,
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
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, 
  },
  errorBox: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    maxWidth: "80%",
  },
  errorText: {
    fontFamily: "ChangwonDangamRound",
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  errorCloseButton: {
    backgroundColor: "#2e4010",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  errorCloseText: {
    color: "#fff",
    fontSize: 16,
  },

});
