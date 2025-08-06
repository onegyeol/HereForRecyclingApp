import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';
import FooterNavigation from '../components/FooterNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const Main: React.FC = () => {
  const router = useRouter();
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const titleImage: ImageSourcePropType = require('../assets/images/text1.png');
  const cameraIcon: ImageSourcePropType = require('../assets/images/camera.png');
  const treeIcon: ImageSourcePropType = require('../assets/images/tree.png');
  const mainImage: ImageSourcePropType = require('../assets/images/mainImage.png');

  // 앱 실행 시 UUID 생성 or 로드
  useEffect(() => {
    const initDeviceId = async () => {
      let id = await AsyncStorage.getItem('device_id');
      if (!id) {
        id = uuidv4();
        await AsyncStorage.setItem('device_id', id);
        console.log('새 Device ID 생성:', id);
      } else {
        console.log('기존 Device ID 사용:', id);
      }
      setDeviceId(id);
    };
    initDeviceId();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={titleImage} style={styles.titleImage} resizeMode="contain" />
        <Image source={mainImage} style={styles.mainImage} resizeMode="contain" />
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.middleText}>이건 어떻게 버리지?</Text>
        <Text style={styles.subText}>AI한테 물어보세요 !</Text>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { marginRight: 6 }]}
            onPress={() => router.navigate('/camera')}
          >
            <Text style={styles.buttonText}>사진 찍기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#6a8536', marginLeft: 6 }]}
            onPress={() => router.navigate('/plusmode')}
          >
            <Text style={styles.buttonText}>설명해줘 모드</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FooterNavigation />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  infoButton: {
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#d4d4d4',
  },
  infoButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    fontFamily: 'ChangwonDangamRound',
  },
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'space-between'},
  titleImage: { width: 330, height: 150, marginTop: 20 },
  mainImage: { width: 320, height: 320, marginTop: -30 },
  topSection: { marginTop: 70, alignItems: 'center', },
  middleSection: { alignItems: 'center', marginTop: -20 },
  middleText: { fontSize: 30, fontFamily: 'ChangwonDangamRoundBold', color: '#333', fontWeight: '900', marginBottom: 10 },
  subText: { fontSize: 21, fontFamily: 'ChangwonDangamRound', color: '#333', fontWeight: '700' },
  bottomSection: { alignItems: 'center' },
  button: {
    backgroundColor: '#2e4010',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontFamily: 'ChangwonDangamRound', fontWeight: 'bold', fontSize: 18 },
  footerItem: {
    alignItems: 'center',
  }
});
