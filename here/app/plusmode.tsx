import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import FooterNavigation from '../components/FooterNavigation';
import * as Speech from 'expo-speech';

export default function PlusModeScreen() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  return () => {
    Speech.stop(); 
    console.log("TTS 정지");
  };
}, []);

  const handleSubmit = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('https://7282-117-16-153-63.ngrok-free.app/plusmode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      const json = await res.json();
      if (json.result) {
        setResult(json.result);
        Speech.speak(json.result, { language: 'ko-KR', pitch: 1.0, rate: 1.0 });
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>설명해줘 모드</Text>
        <Text style={styles.subTitle}>어떤 쓰레기인지 설명해 주세요. {'\n'}AI가 설명해줄 거예요 ! </Text>
        <Text style={styles.ex}>예시: 일회용 커피컵은 어떻게 버려? 컵홀더랑 빨대가 있어 </Text>
        <TextInput
          style={styles.input}
          placeholder="예: 커피 마신 컵, 종이 홀더, 플라스틱 빨대"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>AI에게 물어보기</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#2e4010" style={{ marginTop: 20 }} />}

        {result !== '' && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>분리배출 방법</Text>
            <Text style={styles.resultText}>{result}</Text>
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'ChangwonDangamRound',
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
