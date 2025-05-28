import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      await new Promise(resolve => setTimeout(resolve, 6000)); // 2초 대기
      setReady(true);
      await SplashScreen.hideAsync(); // 스플래시 숨기기
    };
    load();
  }, []);

  if (!ready) return <View style={{ flex: 1, backgroundColor: '#fff' }} />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="camera" />
    </Stack>
  );
}
