import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';

const Main: React.FC = () => {
  const router = useRouter();

  const titleImage: ImageSourcePropType = require('../assets/images/text1.png');
  const cameraIcon: ImageSourcePropType = require('../assets/images/camera.png');
  const treeIcon: ImageSourcePropType = require('../assets/images/tree.png');

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={titleImage} style={styles.titleImage} resizeMode="contain" />
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.middleText}>이건 어떻게 버리지?</Text>
        <Text style={styles.subText}>AI한테 물어보세요 !</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/camera')}>
          <Text style={styles.buttonText}>사진 찍기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/camera')}>
          <Image source={cameraIcon} style={styles.icon} />
          <Text style={[styles.footerText, { color: '#2e4010' }]}>분리배출 카메라</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/category')}>
          <Image source={treeIcon} style={styles.icon} />
          <Text style={styles.footerText}>분리배출 정보</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' },
  titleImage: { width: 300, height: 120, marginBottom: 5, marginTop: 100 },
  topSection: { marginTop: 80, alignItems: 'center' },
  greenText: { fontSize: 24, color: '#2e4010', fontWeight: '700', marginVertical: 2 },
  middleSection: { alignItems: 'center' },
  middleText: { fontSize: 30, fontFamily: 'ChangwonDangamRoundBold', color: '#333', fontWeight: '900', marginTop: 0 },
  subText: { fontSize: 20, fontFamily: 'ChangwonDangamRound', color: '#333', fontWeight: '700', marginBottom: 24 },
  button: {
    backgroundColor: '#2e4010',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontFamily: 'ChangwonDangamRound', fontWeight: 'bold', fontSize: 16 },
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
