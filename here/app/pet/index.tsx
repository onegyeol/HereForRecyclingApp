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

const PlasticIndex: React.FC = () => {
  const router = useRouter();
  const [fontSize, setFontSize] = useState(14);

  return (
    <>
      <View style={styles.container}>

        <View style={styles.tabContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/pet/transparent' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>투명 페트병</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/pet/color' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>유색 페트병</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 슬라이더 */}
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <Slider
            style={{ width: 250 }}
            minimumValue={12}
            maximumValue={24}
            step={1}
            value={fontSize}
            onValueChange={(value) => setFontSize(value)}
            minimumTrackTintColor="#2e4010"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#2e4010"
          />
          <Text style={{ fontSize: 18, marginBottom: 8, fontFamily: 'ChangwonDangamRound'  }}>글자 크기: {fontSize.toFixed(0)}</Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={[styles.mainText, { fontSize: fontSize + 4 }]}>페트병 분리배출 항목을 선택해주세요.</Text>
          <Text style={[styles.subText, { fontSize }]}>각 항목별로 정확한 분리배출 방법이 안내됩니다.</Text>
        </View>
      </View>
    </>
  );
};

export default PlasticIndex;

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
