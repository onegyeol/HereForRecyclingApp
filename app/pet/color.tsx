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

export default function ColorPetGuide(): React.JSX.Element {
  return (
    <View style={styles.container}>

      {/* 탭 고정 */}
      <View style={styles.tabContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/pet/transparent')}>
            <Text style={styles.tabText}>투명 페트병</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/pet/color')}>
            <Text style={styles.tabText_selected}>유색 페트병</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 스크롤 가능한 내용 */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={require('../../assets/images/guideline/colorpet1.png')} style={styles.image} />
        <Text style={styles.description}>
          유색 페트병은{"\n"}
          안의 내용물을 비워줘요.
        </Text>

        <Image source={require('../../assets/images/guideline/colorpet2.png')} style={styles.image} />
        <Text style={styles.description}>
          유색 페트병 라벨을{"\n"}
          깔끔하게 떼줘요.
        </Text>

        <Image source={require('../../assets/images/guideline/colorpet3.png')} style={styles.image} />
        <Text style={styles.description_last}>
          유색 페트병은 색상이 섞여{"\n"}
          재활용 후 제품의 품질이 떨어지고, {"\n"}
          색상 문제로 식품 용기 같은 {"\n"}
          고급 재활용품으로 사용할 수 없기에{"\n"}
          플라스틱으로 배출해요.
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
});
