// app/_layout.tsx
import { Slot, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlasticLayout() {
  const router = useRouter();

  return ( <View style={styles.container}>
      <Text style={styles.title}>플라스틱 분리배출 방법</Text>

      <View style={styles.content}>
        <Slot />
      </View>

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
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f0dc',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 30,
    fontFamily: 'ChangwonDangamRoundBold',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
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
