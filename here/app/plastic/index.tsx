import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

const PlasticIndex: React.FC = () => {
  const router = useRouter();

  return (
    <>
      {/* 헤더 숨기기 */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <Text style={styles.title}>플라스틱 분리배출 방법</Text>

        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/cup' as const)}>
              <Text style={styles.tabText}>커피컵</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/delivery' as const)}>
              <Text style={styles.tabText}>배달 용기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/shampoo' as const)}>
              <Text style={styles.tabText}>샴푸통</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/instant' as const)}>
              <Text style={styles.tabText}>즉석밥 용기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/straw' as const)}>
              <Text style={styles.tabText}>빨대</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.mainText}>플라스틱 분리배출 항목을 선택해주세요.</Text>
          <Text style={styles.subText}>각 항목별로 정확한 분리배출 방법이 안내됩니다.</Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/camera')}>
            <Image source={require('../../assets/images/camera.png')} style={styles.icon} />
            <Text style={[styles.footerText, { color: '#2e4010' }]}>분리배출 카메라</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/category')}>
            <Image source={require('../../assets/images/tree.png')} style={styles.icon} />
            <Text style={styles.footerText}>분리배출 정보</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default PlasticIndex;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, backgroundColor: '#fff' },
  title: {
    fontSize: 30,
    fontFamily: 'ChangwonDangamRoundBold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  tab: {
    backgroundColor: '#eee',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'ChangwonDangamRound',
    fontWeight: '600',
  },
  contentBox: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  mainText: {
    fontSize: 18,
    fontFamily: 'ChangwonDangamRound',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    fontFamily: 'ChangwonDangamRound',
    color: '#555',
    textAlign: 'center',
    marginBottom: 475,
  },
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
