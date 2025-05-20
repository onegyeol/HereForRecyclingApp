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

export default function NoteGuide(): React.JSX.Element {
  return (
    <View style={styles.container}>

      {/* 탭 고정 */}
      <View style={styles.tabContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/paper/box')}>
            <Text style={styles.tabText}>박스</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/paper/note')}>
            <Text style={styles.tabText_selected}>책 종류</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 스크롤 가능한 내용 */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={require('../../assets/images/guideline/note1.png')} style={styles.image} />
        <Text style={styles.description}>
          공책, 교과서 등은
        </Text>

        <Image source={require('../../assets/images/guideline/note2.png')} style={styles.image} />
        <Text style={styles.description}>
          스프링, 겉 표지를 {"\n"}
          분리해줘요.
        </Text>

        <Image source={require('../../assets/images/guideline/note3.png')} style={styles.image} />
        <Text style={styles.description_last}>
          스프링, 겉 표지 등은 {"\n"}
          일반 쓰레기로 배출해요. {"\n"}
          속지만 종이로 분리배출해요.{"\n"}
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
