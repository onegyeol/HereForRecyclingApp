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
      {/* 왼쪽 분리배출 정보 버튼 */}
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
      

      {/* 중앙 플로팅 카메라 버튼 */}
      <TouchableOpacity
        style={styles.cameraButton}
        disabled={disabled}
        onPress={() => {
          if (!disabled && pathname !== '/mainScreen') {
            router.replace('/mainScreen');
          }
        }}
      >
        <Image source={require('../assets/images/home.png')} style={styles.cameraIcon} />
      </TouchableOpacity>

      {/* 오른쪽 정보 버튼 */}
      <TouchableOpacity
        style={styles.footerItem}
        disabled={disabled}
        onPress={() => {
          if (!disabled && pathname !== '/info') {
            router.replace('/info');
          }
        }}
      >
        <Image source={require('../assets/images/info.png')} style={styles.icon} />
        <Text
          style={[
            styles.footerText,
            pathname.startsWith('/info') ? styles.activeText : styles.inactiveText,
          ]}
        >
          정보
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
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    position: 'relative', // 카메라 버튼 absolute 기준
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
  cameraButton: {
    position: 'absolute',
    bottom: 50, // footer border-top에 걸치도록
    left: '50%',
    transform: [{ translateX: -30 }],
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#4e6626',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 5,
  },
  cameraIcon: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
});
