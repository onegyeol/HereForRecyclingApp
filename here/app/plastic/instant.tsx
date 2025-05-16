import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router, useRouter } from 'expo-router';

export default function InstantContainerGuide(): React.JSX.Element {
  return (
    <View style={styles.container}>

      {/* 탭 고정 */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/cup')}>
            <Text style={styles.tabText}>커피컵</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/delivery')}>
            <Text style={styles.tabText}>배달 용기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/shampoo')}>
            <Text style={styles.tabText}>샴푸통</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/instant')}>
            <Text style={styles.tabText_selected}>즉석밥 용기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/plastic/straw')}>
            <Text style={styles.tabText}>빨대</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 스크롤 가능한 내용 */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/images/guideline/hetbahn1.png')} style={styles.image} />
        <Text style={styles.description}>
          즉석밥 용기는{"\n"}
          뚜껑을 제거해줘요.
        </Text>

        <Image source={require('../../assets/images/guideline/hetbahn2.png')} style={styles.image} />
        <Text style={styles.description}>
          즉석밥 용기는{"\n"}
          깨끗히 씻어줘요.
        </Text>

        <Image source={require('../../assets/images/guideline/hetbahn3.png')} style={styles.image} />
        <Text style={styles.description_last}>
          깨끗하게 씻은 용기는{"\n"}
          플라스틱에 배출해요.
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
