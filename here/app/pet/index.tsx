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
      <View style={styles.container}>

        <View style={styles.tabContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/pet/transparent' as const)}>
              <Text style={styles.tabText}>투명 페트병</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/pet/color' as const)}>
              <Text style={styles.tabText}>유색 페트병</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.mainText}>페트병 분리배출 항목을 선택해주세요.</Text>
          <Text style={styles.subText}>각 항목별로 정확한 분리배출 방법이 안내됩니다.</Text>
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
    fontWeight: 'bold',
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
  },
});
