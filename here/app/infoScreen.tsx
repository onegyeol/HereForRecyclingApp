import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FooterNavigation from '../components/FooterNavigation';

export default function InfoScreen() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:herefornetzero@gmail.com');
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/here_for_recycling?igsh=emtsaG80YTZ0Y3pq');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>👥 팀 소개</Text>
          <Text style={styles.content}>
            안녕하세요, Here 팀입니다.{"\n\n"}
            분리배출은 환경 보호를 위한 가장 기본적인 실천이지만, 다양한 재질의 제품과
            복잡한 분리 기준으로 인해 많은 사람들이 여전히 혼란을 겪고 있습니다.{"\n\n"}

            저희는 이러한 문제를 해결하고자 AI 이미지 인식 기술을 기반으로 사용자가 촬영한 쓰레기를 
            분석하고, 정확한 분리배출 방법을 안내해주는 모바일 애플리케이션을 개발하였습니다. {"\n\n"}

            누구나 쉽고 직관적으로 사용할 수 있도록 설계하여, 일상 속에서 자연스럽게 분리배출 습관을 
            실천할 수 있도록 돕는 것이 저희의 목표입니다.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>👩‍💻 팀원 소개</Text>
          <View style={styles.memberContainer}>
            <View style={styles.member}>
              <Image
                source={require('../assets/images/seul.png')}
                style={styles.memberImage}
              />
              <Text style={styles.memberName}>구슬이</Text>
              <Text style={styles.memberRole}>YOLO 모델 / 앱 개발</Text>
            </View>
            <View style={styles.member}>
              <Image
                source={require('../assets/images/gyeol.png')}
                style={styles.memberImage}
              />
              <Text style={styles.memberName}>최한결</Text>
              <Text style={styles.memberRole}>YOLO 모델 / 앱 개발</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>🌱 팀명 의미</Text>
          <Text style={styles.content}>
           팀명 Here는 올바른 쓰레기 분리배출 실천을 돕겠다는 의미를 담고 있으며,
            이 안에 저희가 지향하는 4가지 핵심 가치가 담겨 있습니다.{"\n"}
          </Text>
          <View style={styles.valueRow}>
            <View>
            <Text style={styles.valueTitle}>H - Helpful</Text>
            <Text style={styles.valueDesc}>친절하고 정확한 분리배출 안내 제공</Text>
            </View>
            </View>

            <View style={styles.valueRow}>
                <View>
                <Text style={styles.valueTitle}>E - Eco-friendly</Text>
                <Text style={styles.valueDesc}>자원 순환을 촉진하고 환경 보호에 기여</Text>
                </View>
            </View>

            <View style={styles.valueRow}>
                <View>
                <Text style={styles.valueTitle}>R - Responsible</Text>
                <Text style={styles.valueDesc}>환경과 사회를 함께 고려하는 책임감</Text>
                </View>
            </View>

            <View style={styles.valueRow}>
                <View>
                <Text style={styles.valueTitle}>E - Easy</Text>
                <Text style={styles.valueDesc}>
                    직관적인 UI/UX 및 글자 크기 조절 및 음성 안내(TTS)로  {'\n'}
                    누구나 쉽게 사용할 수 있도록 접근성 강화
                </Text>
                </View>
            </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>문의</Text>
          <Text style={styles.content}>
            더 나은 서비스를 위한 의견 및 제안이 있으시다면 아래 이메일 또는 인스타그램 DM으로 연락주세요. 🙂 {'\n'}
          </Text>
          <TouchableOpacity style={styles.linkRow} onPress={handleEmailPress}>
            <Ionicons name="mail" size={22} color="#2e4010" />
            <Text style={styles.linkText}>herefornetzero@gmail.com</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkRow} onPress={handleInstagramPress}>
            <Ionicons name="logo-instagram" size={22} color="#e1306c" />
            <Text style={styles.linkText}>@here_for_recycling</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f2',
    paddingTop: 40
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e4010',
    marginBottom: 10,
    fontFamily: 'ChangwonDangamRoundBold',
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    fontFamily: 'ChangwonDangamRound',
  },
  valuesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e4010',
    marginBottom: 16,
    fontFamily: 'ChangwonDangamRoundBold',
    },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    },
    valueTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2e4010',
    fontFamily: 'ChangwonDangamRoundBold',
    },
    valueDesc: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
    fontFamily: 'ChangwonDangamRound',
    },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'ChangwonDangamRound',
    color: '#2e4010',
    textDecorationLine: 'underline',
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  member: {
    alignItems: 'center',
    width: 130,
  },
  memberImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ChangwonDangamRound',
    color: '#2e4010',
  },
  memberRole: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    fontFamily: 'ChangwonDangamRound',
  },
});
