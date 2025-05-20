import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function CupGuide(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/cup')}>
              <Text style={styles.tabText_selected}>커피컵</Text>
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

    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Image source={require('../../assets/images/guideline/cup1.png')} style={styles.image} />
      <Text style={styles.description}>
        테이크아웃 커피컵은{"\n"}
        컵과 빨대, 컵홀더를 분리해요.
      </Text>

      <Image source={require('../../assets/images/guideline/cup2.png')} style={styles.image} />
      <Text style={styles.description}>
        컵을 깨끗히 세척하고{"\n"}
        빨대는 일반쓰레기에 버려줘요.
      </Text>

      <Image source={require('../../assets/images/guideline/cup3.png')} style={styles.image} />
      <Text style={styles.description_last}>
        깨끗하게 씻은 컵은{"\n"}
        플라스틱에 배출해요.
      </Text>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
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
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: 'ChangwonDangamRoundBold',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 280,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'ChangwonDangamRound',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  description_last: {
    fontSize: 16,
    fontFamily: 'ChangwonDangamRound',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
