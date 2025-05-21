import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import { usePhotoStore } from '../app/stores/ImageStores';
import Svg, { Rect } from 'react-native-svg';
import FooterNavigation from '../components/FooterNavigation';
import * as Speech from 'expo-speech'; // TTS 
import Slider from '@react-native-community/slider'; // 슬라이더로 글자 사이즈 조정


interface Detection {
    name: string;
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
}

interface ResultData {
    detections: Detection[];
    explanations: string;
    image_url?: string; // 선택적 필드
    original_width?: number;   // 원본 이미지의 너비
    original_height?: number;  // 원본 이미지의 높이
}

export default function ResultScreen() {
    const router = useRouter();
    const [data, setData] = useState<ResultData | null>(null);
    const [loading, setLoading] = useState(true);
    const { photoUri } = usePhotoStore();
    const [fontSize, setFontSize] = useState(14); // 초기 글자 크기 설정

    useEffect(() => {
        let isMounted = true;
        fetch('http://192.168.0.4:5000/result')
            .then((res) => res.json())
            .then((json) => {
                console.log("받은 데이터:", json);
                setData(json);
                setLoading(false);

                if (json.explanations && json.explanations.trim().length > 0) {
                    console.log("TTS 실행:", json.explanations);
                    Speech.speak(json.explanations, {
                        language: 'ko-KR',
                        pitch: 1.0,
                        rate: 1.0,
                    });
                }
            })
            .catch((error) => {
                if (!isMounted) return;
                console.error('분석 결과 가져오기 실패:', error);
                setLoading(false);
            });

        return () => {
            isMounted = false;
            Speech.stop();
            console.log("TTS 정지");
        };
    }, []);


    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#2e4010" />
                <Text style={styles.loadingText}>분석 결과 불러오는 중...</Text>
            </View>
        );
    }

    if (!data) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>결과를 불러오지 못했습니다.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                {photoUri && (
                    <View style={styles.imageWrapper}>
                        <ImageBackground
                            source={{ uri: photoUri }}
                            style={{ flex: 1 }}
                            resizeMode="cover"
                        >
                            <Svg style={StyleSheet.absoluteFill}>
                                {data?.detections?.map((box, index) => (
                                    <Rect
                                        key={index}
                                        x={box.xmin}
                                        y={box.ymin}
                                        width={box.xmax - box.xmin}
                                        height={box.ymax - box.ymin}
                                        stroke="red"
                                        strokeWidth="2"
                                        fill="transparent"
                                    />
                                ))}
                            </Svg>
                        </ImageBackground>
                    </View>
                )}

                <Text style={styles.resultTitle}>분석 결과</Text>

                {data?.detections && data.detections.length > 0 && (
                    <View style={styles.block}>
                        <Text style={styles.blockTitle}>탐지된 항목</Text>
                        {data.detections.map((item, index) => (
                            <Text key={index} style={styles.blockContent}>
                                {index + 1}. {item.name}
                            </Text>
                        ))}
                    </View>
                )}

                {data?.explanations && (
                    <View style={styles.block}>
                        <Text style={styles.blockTitle}>분리배출 방법</Text>

                        {/* ⬇️ fontSize 상태를 적용 */}
                        <Text style={[styles.blockContent, { fontSize }]}>
                            {data.explanations}
                        </Text>

                        {/* ⬇️ 글자 크기 조절 슬라이더 추가 */}
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

                        <TouchableOpacity
                            onPress={() => {
                                Speech.stop();
                                Speech.speak(data.explanations, {
                                    language: 'ko-KR',
                                    pitch: 1.0,
                                    rate: 1.0,
                                });
                            }}
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
    container: { flex: 1, backgroundColor: '#fff' },
    scroll: { alignItems: 'center', padding: 24 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 12, fontSize: 16, color: '#555' },
    errorText: { fontSize: 16, color: 'red' },
    image: {
        width: 280,
        height: 280,
        resizeMode: 'contain',
        borderRadius: 8,
        marginBottom: 20,
    },
    resultTitle: {
        fontSize: 30,
        fontFamily: 'ChangwonDangamRoundBold',
        fontWeight: 'bold',
        color: '#d73a3a',
        marginBottom: 20,
        marginTop: 30,
    },
    block: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        width: '100%',
    },
    blockTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'ChangwonDangamRoundBold',
        marginBottom: 8,
        color: '#333',
    },
    blockContent: {
        fontSize: 14,
        fontFamily: 'ChangwonDangamRound',
        lineHeight: 22,
        color: '#555',
    },
    navButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        paddingBottom: 24,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        backgroundColor: "#fff",
        width: "100%",
    },
    footerItem: { alignItems: 'center' },
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
    imageWrapper: {
        width: '90%',
        aspectRatio: 3 / 4,
        alignSelf: 'center',
        marginBottom: 24,
        position: 'relative',
    },
});
