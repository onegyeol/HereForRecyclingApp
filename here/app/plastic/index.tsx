// app/plastic/index.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function PlasticIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/cup')}>
            <Text style={styles.tabText}>커피컵</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/delivery')}>
            <Text style={styles.tabText}>배달 용기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/shampoo')}>
            <Text style={styles.tabText}>샴푸통</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/instant')}>
            <Text style={styles.tabText}>즉석밥 용기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/straw')}>
            <Text style={styles.tabText}>빨대</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>


      <View style={styles.contentBox}>
        <Text style={styles.mainText}>플라스틱 분리배출 항목을 선택해주세요.</Text>
        <Text style={styles.subText}>각 항목별로 정확한 분리배출 방법이 안내됩니다.</Text>
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
