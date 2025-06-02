import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FooterNavigationProps {
  disabled?: boolean;
}

export default function FooterNavigation({ disabled = false }: FooterNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerItem}
        disabled={disabled}
        onPress={() => {
          if (!disabled && pathname !== '/mainScreen') {
            router.replace('/mainScreen');
          }
        }}
      >
        <Image source={require('../assets/images/camera.png')} style={styles.icon} />
        <Text
          style={[
            styles.footerText,
            pathname.startsWith('/mainScreen') ? styles.activeText : styles.inactiveText,
          ]}
        >
          분리배출 카메라
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        disabled={disabled}
        onPress={() => {
          if (!disabled && pathname !== '/category') {
            router.replace('/category');
          }
        }}
      >
        <Image source={require('../assets/images/tree.png')} style={styles.icon} />
        <Text
          style={[
            styles.footerText,
            pathname === '/category' ? styles.activeText : styles.inactiveText,
          ]}
        >
          분리배출 정보
        </Text>
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
    width: 50,
    height: 50,
  },
  footerText: {
    fontFamily: 'ChangwonDangamRound',
    fontSize: 15,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#2e4010',
  },
  inactiveText: {
    color: '#000',
  },
});
