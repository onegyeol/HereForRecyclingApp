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

      <ScrollView contentContainerStyle={styles.gridContainer}>
        <TouchableOpacity onPress={() => router.push('/plastic')} style={styles.item}>
          <Image source={require('../assets/images/plastic.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/pet')} style={styles.item}>
          <Image source={require('../assets/images/pet.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/paper')} style={styles.item}>
          <Image source={require('../assets/images/paper.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/can')} style={styles.item}>
          <Image source={require('../assets/images/can.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/vinyl')} style={styles.item}>
          <Image source={require('../assets/images/plasticbag.png')} style={styles.image} />
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
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 100,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16, 
    margin: 20,
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
    fontWeight: '500',
    color: '#000',
  },
});
