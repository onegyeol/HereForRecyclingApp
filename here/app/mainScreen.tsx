import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';
import FooterNavigation from '../components/FooterNavigation';
import { useCameraPermissions } from 'expo-camera';

const Main: React.FC = () => {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const titleImage: ImageSourcePropType = require('../assets/images/text1.png');
  const cameraIcon: ImageSourcePropType = require('../assets/images/camera.png');
  const treeIcon: ImageSourcePropType = require('../assets/images/tree.png');
  const mainImage: ImageSourcePropType = require('../assets/images/mainImage.png');

  useEffect(() => {
    if (!permission || permission.status !== 'granted') {
      requestPermission(); 
    }
  }, [permission]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={titleImage} style={styles.titleImage} resizeMode="contain" />
        <Image source={mainImage} style={styles.mainImage} resizeMode="contain" />
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.middleText}>이건 어떻게 버리지?</Text>
        <Text style={styles.subText}>AI한테 물어보세요 !</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.navigate('/camera')}>
          <Text style={styles.buttonText}>사진 찍기</Text>
        </TouchableOpacity>
      </View>

      <FooterNavigation />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'space-between'},
  titleImage: { width: 330, height: 150, marginTop: 20 },
  mainImage: { width: 320, height: 320, marginTop: -30 },
  topSection: { marginTop: 70, alignItems: 'center', },
  greenText: { fontSize: 24, color: '#2e4010', fontWeight: '700', marginVertical: 2 },
  middleSection: { alignItems: 'center', marginTop: -20 },
  middleText: { fontSize: 30, fontFamily: 'ChangwonDangamRoundBold', color: '#333', fontWeight: '900', marginBottom: 10 },
  subText: { fontSize: 21, fontFamily: 'ChangwonDangamRound', color: '#333', fontWeight: '700', marginBottom: 23 },
  button: {
    backgroundColor: '#2e4010',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontFamily: 'ChangwonDangamRound', fontWeight: 'bold', fontSize: 18 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  footerItem: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  footerText: {
    fontFamily: 'ChangwonDangamRound',
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
});
