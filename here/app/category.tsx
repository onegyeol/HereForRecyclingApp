import React, { JSX } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import FooterNavigation from '../components/FooterNavigation';

export default function Category(): JSX.Element {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>올바른 분리배출 방법</Text>

      <ScrollView style={styles.scroll}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={true}
      >
        <TouchableOpacity onPress={() => router.push('/plastic')} style={styles.item}>
          <Image source={require('../assets/images/plastic.jpg')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/pet')} style={styles.item}>
          <Image source={require('../assets/images/pet.jpg')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/paper')} style={styles.item}>
          <Image source={require('../assets/images/paper.jpg')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/vinyl')} style={styles.item}>
          <Image source={require('../assets/images/plasticbag.jpg')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/can')} style={styles.item}>
          <Image source={require('../assets/images/can.jpg')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/glass')} style={styles.item}>
          <Image source={require('../assets/images/glass.jpg')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/waste')} style={styles.item}>
          <Image source={require('../assets/images/waste.jpg')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/etc')} style={styles.item}>
          <Image source={require('../assets/images/etc.jpg')} style={styles.image} />
        </TouchableOpacity>
      </ScrollView>

      <FooterNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'ChangwonDangamRoundBold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 50,
  },
  scroll: {
    flex: 1, // 남는 영역을 차지해서 세로 스크롤 가능
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16, 
    margin: 20,
    paddingBottom: 60,
  },
  item: {
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
    padding: 10,
    margin: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
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
    color: '#000',
  },
});
