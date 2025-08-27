import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import Slider from '@react-native-community/slider';

const WasteIndex: React.FC = () => {
  const router = useRouter();
  const [fontSize, setFontSize] = useState(14);

  return (
    <>
      <View style={styles.container}>

        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/straw' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>빨대</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/born' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>뼈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/cd' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>CD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/egg' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>계란 껍질</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/icePack' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>아이스팩</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/lighter' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>라이터</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/mirror' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>거울</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/receipt' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>영수증</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/seed' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>단단한 껍질류</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/tube' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>튜브형 용기</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* ✅ 슬라이더 추가 */}
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={12}
            maximumValue={24}
            step={1}
            value={fontSize}
            onValueChange={(value) => setFontSize(value)}
            minimumTrackTintColor="#2e4010"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#2e4010"
          />
          <Text style={{ fontSize: 18, marginBottom: 8, fontFamily: 'ChangwonDangamRound', }}>글자 크기: {fontSize.toFixed(0)}</Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={[styles.mainText, { fontSize: fontSize + 4 }]}>일반쓰레기 분리배출 항목을 선택해주세요.</Text>
          <Text style={[styles.mainText, { fontSize: fontSize + 4 }]}>각 항목별로 정확한 분리배출 방법이 안내됩니다.</Text>
        </View>
      </View>
    </>
  );
};

export default WasteIndex;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: 30,
    fontFamily: 'ChangwonDangamRoundBold',
    textAlign: 'center',
    marginBottom: 16,
  },
  tabContainer: {
    justifyContent: 'center',
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
  },
  contentBox: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  mainText: {
    fontSize: 18,
    fontFamily: 'ChangwonDangamRound',
    marginBottom: 12,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    fontFamily: 'ChangwonDangamRound',
    color: '#555',
    textAlign: 'center',
  },
});
