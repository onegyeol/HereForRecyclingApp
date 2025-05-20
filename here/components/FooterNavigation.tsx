import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FooterNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => {
          if (pathname !== '/mainScreen') {
            router.replace('/mainScreen');
          }
        }}
      >
        <Image source={require('../assets/images/camera.png')} style={styles.icon} />
        <Text style={[styles.footerText, pathname === '/mainScreen' && { color: '#2e4010' }]}>분리배출 카메라</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => {
          if (pathname !== '/category') {
            router.replace('/category');
          }
        }}
      >
        <Image source={require('../assets/images/tree.png')} style={styles.icon} />
        <Text style={[styles.footerText, pathname === '/category' && { color: '#2e4010' }]}>분리배출 정보</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingBottom: 37,
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
