import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';

export default function Category() {
  const router = useRouter();

  return (
    <> 
    {/* 헤더 비활성화 */}
    <Stack.Screen options={{ headerShown: false }} />

    <View style={styles.container}>
      <Text style={styles.title}>올바른 분리배출 방법</Text>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        <View style={styles.item}>
          <Image source={require('../assets/images/plastic.png')} style={styles.image} />
        </View>
        <View style={styles.item}>
          <Image source={require('../assets/images/pet.png')} style={styles.image} />
        </View>
        <View style={styles.item}>
          <Image source={require('../assets/images/paper.png')} style={styles.image} />
        </View>
        <View style={styles.item}>
          <Image source={require('../assets/images/can.png')} style={styles.image} />
        </View>
        <View style={styles.item}>
          <Image source={require('../assets/images/plasticbag.png')} style={styles.image} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/camera')}> 
          <Image source={require('../assets/images/camera.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/category')}> 
          <Image source={require('../assets/images/tree_checked.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 24,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  item: {
    backgroundColor: '#f4f4f4',
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
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  icon: {
    width: 30,
    height: 30,
  },
});