import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function CupGuide(): React.JSX.Element {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 상단 제목 */}
      <Text style={styles.title}>캔 분리배출</Text>

      {/* 스크롤 가능한 내용 */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={require('../assets/images/guideline/can1.png')} style={styles.image} />
        <Text style={styles.description}>
          캔은{"\n"}
          내부를 깨끗히 세척해줘요.
        </Text>

        <Image source={require('../assets/images/guideline/can2.png')} style={styles.image} />
        <Text style={styles.description}>
          캔은{"\n"}
          찌그러트려서
        </Text>

        <Image source={require('../assets/images/guideline/can3.png')} style={styles.image} />
        <Text style={styles.description_last}>
          캔에 배출해요{"\n"}
        </Text>
      </ScrollView>

      {/* 하단 푸터 고정 */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/camera')}>
          <Image source={require('../assets/images/camera.png')} style={styles.icon} />
          <Text style={[styles.footerText, { color: '#2e4010' }]}>분리배출 카메라</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/category')}>
          <Image source={require('../assets/images/tree_checked.png')} style={styles.icon} />
          <Text style={styles.footerText}>분리배출 정보</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'ChangwonDangamRoundBold',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContent: {
    alignItems: 'center',
  },
  image: {
    width: 280,
    height: 200,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 16,
    fontFamily: 'ChangwonDangamRound',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  description_last: {
    fontSize: 16,
    fontFamily: 'ChangwonDangamRound',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    width: '100%',
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
