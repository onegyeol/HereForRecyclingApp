import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterNavigation from '../components/FooterNavigation';
import * as Speech from 'expo-speech';
import Slider from '@react-native-community/slider';

export default function PlusModeScreen() {
  const [fontSize, setFontSize] = useState(14); 
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);

   useEffect(() => {
    const loadDeviceId = async () => {
      const id = await AsyncStorage.getItem('device_id');
      setDeviceId(id);
      console.log('로드된 Device ID:', id);
    };
    loadDeviceId();

    return () => {
      Speech.stop(); 
      console.log("TTS 정지");
    };
  }, []);

  const handleSubmit = async () => {
    if (!description.trim() || !deviceId) return;

    setLoading(true);
    setResult('');
  
    try {
      const res = await fetch('https://herefornetzero.com/plusmode', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Device-ID': deviceId,  
        },
        body: JSON.stringify({ description }),
      });

      const json = await res.json();
      if (json.result) {
        setResult(json.result);
        Speech.speak(json.result, { language: 'ko-KR', pitch: 1.0, rate: 1.0 });
      } else if (json.error) {
        setResult(`⚠️ ${json.error}`);
      } else {
        setResult('응답을 받지 못했습니다.');
      }
    } catch (err) {
      console.error('플러스모드 오류:', err);
      setResult('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleReplay = () => {
    if (result.trim()) {
      Speech.stop();
      Speech.speak(result, { language: 'ko-KR', pitch: 1.0, rate: 1.0 });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>설명 모드</Text>
        <Text style={styles.subTitle}>어떤 쓰레기인지 설명해 주세요. {'\n'}AI가 설명해줄 거예요 ! </Text>
        <Text style={styles.ex}>예시: 일회용 커피컵은 어떻게 버려? 컵홀더랑 빨대가 있어 </Text>
        <TextInput
          style={styles.input}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={loading}>
          <Text style={styles.buttonText}>AI에게 물어보기</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#2e4010" style={{ marginTop: 20 }} />}

        {result !== '' && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>분리배출 방법</Text>

            <View style={{ marginTop: 16 }}>
              <Text style={{ marginBottom: 8, fontSize: 13 }}>글자 크기: {fontSize.toFixed(0)}</Text>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={12}
                maximumValue={24}
                step={1}
                value={fontSize}
                onValueChange={(value) => setFontSize(value)}
                minimumTrackTintColor="#2e4010"
                maximumTrackTintColor="#ccc"
              />
            </View>

            <Text style={[styles.blockContent, { fontSize }]}>{result}</Text>

            <TouchableOpacity
              onPress={handleReplay}
              style={{
                marginTop: 12,
                padding: 10,
                backgroundColor: '#2e4010',
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>다시 듣기</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <FooterNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60 },
  scroll: { padding: 24, paddingBottom: 100 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e4010',
    fontFamily: 'ChangwonDangamRoundBold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    color: '#555',
    fontFamily: 'ChangwonDangamRound',
    marginBottom: 40,
  },
  ex: {
    fontSize: 15,
    color: '#555',
    fontFamily: 'ChangwonDangamRound',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2e4010',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'ChangwonDangamRound',
  },
  blockContent: {
    fontSize: 14,
    fontFamily: 'ChangwonDangamRound',
    lineHeight: 22,
    color: '#555',
},
  resultBox: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2e4010',
    fontFamily: 'ChangwonDangamRoundBold',
  },
  resultText: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'ChangwonDangamRound',
    color: '#333',
  },
});