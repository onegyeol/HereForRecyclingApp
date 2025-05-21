import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router, useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

export default function SnackVinylGuide(): React.JSX.Element {
  const [fontSize, setFontSize] = useState(16);

  return (
    <View style={styles.container}>
          {/* 탭 메뉴 */}
      <View style={styles.tabContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => router.push('/vinyl/plasticbag' as const)}
          >
            <Text style={[styles.tabText, { fontSize }]}>비닐봉투</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => router.push('/vinyl/snackVinyl' as const)}
          >
            <Text style={[styles.tabText_selected, { fontSize }]}>과자봉지</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => router.push('/vinyl/ramenVinyl' as const)}
          >
            <Text style={[styles.tabText, { fontSize }]}>라면봉지</Text>
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
        <Text style={{ fontSize: 18, marginBottom: 8 }}>글자 크기: {fontSize.toFixed(0)}</Text>
      </View>

      {/* 스크롤 가능한 내용 */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/images/guideline/snack1.jpg')} style={styles.image} />
        <Text style={[styles.description, { fontSize }]}>
          과자 봉지는{"\n"}
        </Text>

        <Image source={require('../../assets/images/guideline/snack2.jpg')} style={styles.image} />
        <Text style={[styles.description, { fontSize }]}>
          안의 과자들을 버리고{"\n"}
          깨끗하게 씻어줘요.
        </Text>

        <Image source={require('../../assets/images/guideline/snack3.jpg')} style={styles.image} />
        <Text style={[styles.description, { fontSize }]}>
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
