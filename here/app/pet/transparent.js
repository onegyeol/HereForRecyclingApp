import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function CupGuide() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 상단 제목 */}
      <Text style={styles.title}>투명 페트병 분리배출</Text>

      {/* 탭 고정 */}
      <View style={styles.tabContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/pet/transparent')}>
            <Text style={styles.tabText_selected}>투명 페트병</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/pet/color')}>
            <Text style={styles.tabText}>유색 페트병</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 스크롤 가능한 내용 */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/images/guideline/pet1.png')} style={styles.image} />
        <Text style={styles.description}>
          투명 페트병은{"\n"}
          안의 내용물을 비워줘요.
        </Text>

        <Image source={require('../../assets/images/guideline/pet2.png')} style={styles.image} />
        <Text style={styles.description}>
          투명 페트병 라벨을{"\n"}
          깔끔하게 떼줘요.
        </Text>

        <Image source={require('../../assets/images/guideline/pet3.png')} style={styles.image} />
        <Text style={styles.description_last}>
          페트병 뚜껑을 닫고{"\n"}
          찌그러트려서 페트병에 배출해요.
        </Text>
      </ScrollView>

      {/* 하단 푸터 고정 */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/camera')}>
          <Image source={require('../../assets/images/camera.png')} style={styles.icon} />
          <Text style={[styles.footerText, { color: '#2e4010' }]}>분리배출 카메라</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/category')}>
          <Image source={require('../../assets/images/tree_checked.png')} style={styles.icon} />
          <Text style={styles.footerText}>분리배출 정보</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 80, alignItems: 'center' },
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
