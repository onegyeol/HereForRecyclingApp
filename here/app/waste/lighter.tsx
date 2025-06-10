import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Speech from 'expo-speech';
import { router, useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

export default function LighterGuide(): React.JSX.Element {
  const [fontSize, setFontSize] = useState(14);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const shouldStopRef = useRef(false);
  const descriptions = [
    '라이터는 내부 가스를 모두 배출한 뒤',
    '재활용이 어렵기에 일반 쓰레기로 배출해요',
  ];

  // 페이지 이동 등으로 언마운트될 때 TTS 중지
  useEffect(() => {
    return () => {
      Speech.stop();
      shouldStopRef.current = true;
      setIsSpeaking(false);
    };
  }, []);

  const readDescriptionsSequentially = (index = 0) => {
    if (shouldStopRef.current) {
      setIsSpeaking(false);
      return;
    }
  
    if (index >= descriptions.length) {
      setIsSpeaking(false);
      return;
    }
  
    Speech.speak(descriptions[index], {
      language: 'ko',
      pitch: 1.0,
      rate: 1.0,
      onDone: () => {
        if (!shouldStopRef.current) {
          readDescriptionsSequentially(index + 1);
        } else {
          setIsSpeaking(false);
        }
      },
    });
  };

  const handleTTSButtonPress = () => {
    if (isSpeaking) {
      shouldStopRef.current = true;
      Speech.stop();             // 즉시 중단
      setIsSpeaking(false);
    } else {
      shouldStopRef.current = false;      // 다시 듣기 누르면 false로 초기화
      setIsSpeaking(true);
      readDescriptionsSequentially(0); // 0번 인덱스부터 시작
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/straw' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>빨대</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/born' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>뼈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/cd' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>CD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/egg' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>계란 껍질</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/icePack' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>아이스팩</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/lighter' as const)}>
              <Text style={[styles.tabText_selected, { fontSize }]}>라이터</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/mirror' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>거울</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/receipt' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>영수증</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/seed' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>단단한 껍질류</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/waste/tube' as const)}>
              <Text style={[styles.tabText, { fontSize }]}>튜브형 용기</Text>
            </TouchableOpacity>
          </ScrollView>
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

      <TouchableOpacity onPress={handleTTSButtonPress} style={styles.listenButton}>
        <Text style={styles.listenButtonText}>
          {isSpeaking ? '설명 멈추기' : '설명 듣기'}
        </Text>
      </TouchableOpacity>

      {/* 스크롤 가능한 내용 */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/images/guideline/lighter1.jpg')} style={styles.image} />
        <Text style={[styles.description, { fontSize }]}>
          라이터는
        </Text>

        <Image source={require('../../assets/images/guideline/lighter2.jpg')} style={styles.image} />
        <Text style={[styles.description_last, { fontSize }]}>
          내부 가스를 모두 배출한 후
        </Text>

        <Image source={require('../../assets/images/guideline/lighter3.jpg')} style={styles.image} />
        <Text style={[styles.description_last, { fontSize }]}>
          재활용이 어렵기에{"\n"}
          일반 쓰레기로 배출해요
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
  },
  listenButton: {
    backgroundColor: '#2e4010',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  listenButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'ChangwonDangamRound',
    fontWeight: '600',
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
