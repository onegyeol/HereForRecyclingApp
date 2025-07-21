import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { usePhotoStore } from '../app/stores/ImageStores';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
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
    const [data, setData] = useState<ResultData | null>(null);
    const [loading, setLoading] = useState(true);
    const { photoUri, resultUUID } = usePhotoStore();
    const [fontSize, setFontSize] = useState(14); 
    const [imageSize, setImageSize] = useState<{ width: number, height: number } | null>(null);
    const [originalSize, setOriginalSize] = useState<{ width: number, height: number } | null>(null);
    const [containerSize, setContainerSize] = useState<{ width: number; height: number } | null>(null);

    const labelKoMap: { [key: string]: string } = {
        PLASTIC: '플라스틱',
        WASTE: '일반쓰레기',
        PET: '페트',
        LDPE: '비닐류',
        PAPER: '종이류',
        CAN: '캔류',
        GLASS: '유리',
        };

    useEffect(() => {
        if (!photoUri) return;
        Image.getSize(photoUri, (w, h) => {
            setOriginalSize({ width: w, height: h });
        });
        }, [photoUri]);

    useEffect(() => {
        if (!resultUUID) return;
        let isMounted = true;
        fetch(`https://herefornetzero.com/result/${resultUUID}`)
            .then((res) => res.json())
            .then((json) => {
                console.log("받은 데이터:", json);
                setData(json);
                setLoading(false);

                if (json.explanations && json.explanations.trim().length > 0) {
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

    function getImageActualLayout(original: { width: number; height: number }, container: { width: number; height: number }) {
        const imageRatio = original.width / original.height;
        const containerRatio = container.width / container.height;

        let actualWidth = container.width;
        let actualHeight = container.height;
        let offsetX = 0;
        let offsetY = 0;

        if (imageRatio > containerRatio) {
        // 여백은 위아래
        actualHeight = container.width / imageRatio;
        offsetY = (container.height - actualHeight) / 2;
        } else {
        // 여백은 좌우
        actualWidth = container.height * imageRatio;
        offsetX = (container.width - actualWidth) / 2;
        }

        return { actualWidth, actualHeight, offsetX, offsetY };
    }

    if (loading) {
        return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" />
            <Text>로딩 중...</Text>
        </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View
                    style={styles.imageContainer}
                    onLayout={(e) => {
                    const { width, height } = e.nativeEvent.layout;
                    setContainerSize({ width, height });
                    }}
                >
                    {photoUri && (
                        <Image
                            source={{ uri: photoUri }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        )}

                    {originalSize && containerSize && (
                    (() => {
                        const { actualWidth, actualHeight, offsetX, offsetY } =
                        getImageActualLayout(originalSize, containerSize);

                        const xRatio = actualWidth / originalSize.width;
                        const yRatio = actualHeight / originalSize.height;

                        return (
                        <Svg
                            width={containerSize.width}
                            height={containerSize.height}
                            style={StyleSheet.absoluteFill}
                            >
                            {data.detections.map((box, index) => {
                                const x = offsetX + box.xmin * xRatio;
                                const y = offsetY + box.ymin * yRatio;
                                const width = (box.xmax - box.xmin) * xRatio;
                                const height = (box.ymax - box.ymin) * yRatio;

                                return (
                                <React.Fragment key={index}>
                                    <Rect
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    stroke="green"
                                    strokeWidth={2}
                                    fill="transparent"
                                    />
                                    <Rect
                                        x={x + 2}
                                        y={y + 2}
                                        width={labelKoMap[box.name].length * 12}
                                        height={20}
                                        fill="white"
                                    />
                                    <SvgText
                                        x={x + 4}
                                        y={y + 16}
                                        fill="green"
                                        fontSize="12"
                                        fontWeight="bold"
                                        >
                                        {labelKoMap[box.name]}
                                    </SvgText>

                                </React.Fragment>
                                );
                            })}
                            </Svg>

                        );
                    })()
                    )}
                </View>

                <Text style={styles.resultTitle}>분석 결과</Text>

                {data?.detections && data.detections.length > 0 && (
                    <View style={styles.block}>
                        <Text style={styles.blockTitle}>탐지된 항목</Text>
                        {data.detections.map((item, index) => (
                            <Text key={index} style={styles.blockContent}>
                                {index + 1}. {labelKoMap[item.name]}
                            </Text>
                            ))}
                    </View>
                )}

                {data?.explanations && (
                    <View style={styles.block}>
                        <Text style={styles.blockTitle}>분리배출 방법</Text>

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

                        <Text style={[styles.blockContent, { fontSize }]}>
                            {data.explanations}
                        </Text>

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
    imageContainer: {
        width: '90%',
        aspectRatio: 3 / 4,
        position: 'relative',
        marginBottom: 20,
    },
    image: {
    width: '100%',
    height: '100%',
  },
});
