// app/plastic/index.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

export default function PlasticIndex() {
  const router = useRouter();
  const [fontSize, setFontSize] = useState(14);

  return (
    <View style={styles.container}>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/cup')}>
            <Text style={[styles.tabText, { fontSize }]}>커피컵</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/delivery')}>
            <Text style={[styles.tabText, { fontSize }]}>배달 용기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/shampoo')}>
            <Text style={[styles.tabText, { fontSize }]}>샴푸통</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/instant')}>
            <Text style={[styles.tabText, { fontSize }]}>즉석밥 용기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/straw')}>
            <Text style={[styles.tabText, { fontSize }]}>빨대</Text>
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
        <Text style={{ fontSize: 13, marginBottom: 8 }}>글자 크기: {fontSize.toFixed(0)}</Text>
      </View>

      <View style={styles.contentBox}>
        <Text style={[styles.mainText, { fontSize: fontSize + 4 }]}>플라스틱 분리배출 항목을 선택해주세요.</Text>
        <Text style={[styles.subText, { fontSize }]}>각 항목별로 정확한 분리배출 방법이 안내됩니다.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    color: '#000000',
  },
  scrollContent: {
    alignItems: 'center',
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
  },
});
