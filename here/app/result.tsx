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
    original_width?: number;   // 👉 원본 이미지의 너비
    original_height?: number;  // 👉 원본 이미지의 높이
}

export default function ResultScreen() {
    const router = useRouter();
    const [data, setData] = useState<ResultData | null>(null);
    const [loading, setLoading] = useState(true);
    const { photoUri } = usePhotoStore();

    useEffect(() => {
        fetch('http://192.168.0.4:5000/result')
            .then((res) => res.json())  // ✅ 이제 text가 아니라 json으로 받아도 OK
            .then((json) => {
                console.log(json);
                setData(json);
                setLoading(false);
            })
            .catch((error) => {
                console.error('분석 결과 가져오기 실패:', error);
                setLoading(false);
            });
    }, []);


    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#2e4010" />
                <Text style={styles.loadingText}>분석 결과 불러오는 중...🧚‍♀️</Text>
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
                <View style={{ width: 941, height: 2048 }}>
                    <ImageBackground
                    source={{ uri: photoUri }}
                    style={{ width: '100%', height: '100%' }}
                    >
                    <Svg style={{ width: '100%', height: '100%', position: 'absolute' }}>
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
                    <Text style={styles.blockContent}>{data.explanations}</Text>
                </View>
                )}

            </ScrollView>

            <View style={styles.navButtons}>
                <TouchableOpacity
                    style={styles.footerItem}
                    onPress={() => router.push("/camera")}
                >
                    <Image
                        source={require("../assets/images/camera_checked.png")}
                        style={styles.icon}
                    />
                    <Text style={[styles.footerText, { color: "#2e4010" }]}>
                        분리배출 카메라
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerItem}
                    onPress={() => router.push("/category")}
                >
                    <Image
                        source={require("../assets/images/tree.png")}
                        style={styles.icon}
                    />
                    <Text style={styles.footerText}>분리배출 정보</Text>
                </TouchableOpacity>
            </View>
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
});
