import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  CameraView,
  CameraCapturedPicture,
  useCameraPermissions,
} from "expo-camera";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

export default function CameraScreen(): React.JSX.Element {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();

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
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const result = await response.json();
      console.log("분석 결과:", result);

      alert(
        `탐지 결과: ${result.detected.join(", ")}\n분리배출 방법: ${result.instruction}`
      );
    } catch (error) {
      console.error("❌ 서버 전송 실패:", error);
    }
  };

  const takePhoto = async (): Promise<void> => {
    if (cameraRef.current && !photoTaken) {
      const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync();
      console.log("📸 사진 URI:", photo.uri);
      setPhotoTaken(true);
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

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={takePhoto}
          style={[styles.captureButton, photoTaken && styles.disabledButton]}
          disabled={photoTaken}
        >
          <Text style={styles.captureText}>
            {photoTaken ? "이미 촬영됨" : "촬영"}
          </Text>
        </TouchableOpacity>

        <View style={styles.navButtons}>
          <TouchableOpacity
            style={styles.footerItem}
            onPress={() => router.push("/camera")}
          >
            <Image
              source={require("../assets/images/camera_checked.png")}
              style={styles.icon}
            />
            <Text style={[styles.footerText, { color: "#2e4010" }]}>
              분리배출 카메라
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerItem}
            onPress={() => router.push("/category")}
          >
            <Image
              source={require("../assets/images/tree.png")}
              style={styles.icon}
            />
            <Text style={styles.footerText}>분리배출 정보</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  footer: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
  },
  captureButton: {
    backgroundColor: "#2e4010",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  disabledButton: { backgroundColor: "#999" },
  captureText: {
    color: "#fff",
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
});
