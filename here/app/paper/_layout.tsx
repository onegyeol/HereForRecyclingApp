// app/_layout.tsx
import { Slot, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FooterNavigation from '../../components/FooterNavigation';

export default function PaperLayout() {
  const router = useRouter();

  return ( <View style={styles.container}>
      <Text style={styles.title}>종이류 분리배출 방법</Text>

      <View style={styles.content}>
        <Slot />
      </View>

      <FooterNavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 80 },
  title: {
    fontSize: 30,
    fontFamily: 'ChangwonDangamRoundBold',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
});
