import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import * as Speech from 'expo-speech';
import { router, useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

export default function SprayGuide(): React.JSX.Element {
  const [fontSize, setFontSize] = useState(16);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const shouldStopRef = useRef(false);
  const descriptions = [
    '살충제와 같은 스프레이 종류는',
    '뒤집어서 내부 가스를 모두 배출한 뒤에',
    '캔에 배출해요',
  ]

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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/can/beverage' as const)}>
            <Text style={[styles.tabText, { fontSize }]}>캔류</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/can/spray' as const)}>
            <Text style={[styles.tabText_selected, { fontSize }]}>스프레이류</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ 슬라이더 추가 */}
      <View style={{ marginTop: 10, alignItems: 'center' }}>
        <Slider
          style={{ width: 200, height: 40 }}
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


      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={require('../../assets/images/guideline/spray1.jpg')} style={styles.image} />
        <Text style={[styles.description, { fontSize }]}>
          살충제와 같은{"\n"}
          스프레이 종류는
        </Text>

        <Image source={require('../../assets/images/guideline/spray2.jpg')} style={styles.image} />
        <Text style={[styles.description, { fontSize }]}>
          뒤집어서 내부 가스를{"\n"}
          모두 배출한 뒤에
        </Text>

        <Image source={require('../../assets/images/guideline/spray3.jpg')} style={styles.image} />
        <Text style={[styles.description_last, { fontSize }]}>
          캔에 배출해요.{"\n"}
        </Text>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
