import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router, useRouter } from 'expo-router';

export default function PlasticbagGuide(): React.JSX.Element {
  return (
    <View style={styles.container}>
          <View style={styles.tabContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity style={styles.tab} onPress={() => router.push('/vinyl/plasticbag' as const)}>
                <Text style={styles.tabText_selected}>비닐봉투</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab} onPress={() => router.push('/vinyl/snackVinyl' as const)}>
                <Text style={styles.tabText}>과자봉지</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab} onPress={() => router.push('/vinyl/ramenVinyl' as const)}>
                <Text style={styles.tabText}>라면봉지</Text>
              </TouchableOpacity>
            </View>
          </View>

      {/* 스크롤 가능한 내용 */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/images/guideline/vinyl1.png')} style={styles.image} />
        <Text style={styles.description}>
          비닐, 신문 포장 비닐 등{"\n"}
          투명/불투명 비닐 모두
        </Text>

        <Image source={require('../../assets/images/guideline/vinyl2.png')} style={styles.image} />
        <Text style={styles.description}>
          오염되어있는 부분을{"\n"}
          깨끗하게 씻어줘요.
        </Text>

        <Image source={require('../../assets/images/guideline/vinyl3.png')} style={styles.image} />
        <Text style={styles.description_last}>
          흩날리지 않도록 {"\n"}
          비닐들을 한꺼번에 모아서{"\n"}
          비닐에 배출해요. {"\n"}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  title: {
    fontSize: 30,
    fontFamily: 'ChangwonDangamRoundBold',
    fontWeight: 'bold',
    marginBottom: 20,
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
  tabText_selected: {
    fontSize: 14,
    fontFamily: 'ChangwonDangamRound',
    fontWeight: '600',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'ChangwonDangamRound',
    fontWeight: '600',
    color: '#9E9E9E',
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
