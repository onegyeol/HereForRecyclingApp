import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Speech from 'expo-speech';
import Slider from '@react-native-community/slider';

export default function CupGuide(): React.JSX.Element {
  const [fontSize, setFontSize] = useState(14);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const shouldStopRef = useRef(false);
  const descriptions = [
    '테이크아웃 커피컵은 컵과 빨대, 컵홀더를 분리해요.',
    '컵을 깨끗히 세척하고 빨대는 일반쓰레기에 버려줘요.',
    '깨끗하게 씻은 컵은 플라스틱에 배출해요.',
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
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/cup')}>
            <Text style={[styles.tabText_selected, { fontSize }]}>커피컵</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/delivery')}>
            <Text style={[styles.tabText, { fontSize }]}>배달 용기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/shampoo')}>
            <Text style={[styles.tabText, { fontSize }]}>샴푸통</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/instant')}>
            <Text style={[styles.tabText, { fontSize }]}>즉석밥 용기</Text>
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
        <Text style={{ fontSize: 18, marginBottom: 8, fontFamily: 'ChangwonDangamRound'  }}>글자 크기: {fontSize.toFixed(0)}</Text>
      </View>

      <TouchableOpacity onPress={handleTTSButtonPress} style={styles.listenButton}>
        <Text style={styles.listenButtonText}>
          {isSpeaking ? '설명 멈추기' : '설명 듣기'}
        </Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/images/guideline/cup1.png')} style={styles.image} />
        <Text style={[styles.description, { fontSize }]}>
          테이크아웃 커피컵은{"\n"}
          컵과 빨대, 컵홀더를 분리해요.
        </Text>

        <Image source={require('../../assets/images/guideline/cup2.png')} style={styles.image} />
        <Text style={[styles.description, { fontSize }]}>
          컵을 깨끗히 세척하고{"\n"}
          빨대는 일반쓰레기에 버려줘요.
        </Text>

        <Image source={require('../../assets/images/guideline/cup3.png')} style={styles.image} />
        <Text style={[styles.description_last, { fontSize }]}>
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
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'ChangwonDangamRound',
    color: '#9E9E9E',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 32,
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
  },
  title: {
    fontSize: 24,
    fontFamily: 'ChangwonDangamRoundBold',
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
  },
  description_last: {
    fontSize: 16,
    fontFamily: 'ChangwonDangamRound',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
