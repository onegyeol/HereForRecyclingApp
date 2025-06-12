import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native'; 

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ChangwonDangamRound: require('../assets/fonts/ChangwonDangamRound.ttf'),
    ChangwonDangamRoundBold: require('../assets/fonts/ChangwonDangamAsac-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="camera" />
          <Stack.Screen name="category" />
          <Stack.Screen name="plastic" />
          <Stack.Screen name="pet" />
          <Stack.Screen name="can" />
          <Stack.Screen name="paper" />
          <Stack.Screen name="vinyl" />
          <Stack.Screen name="result" />
          <Stack.Screen name="mainScreen" />
          <Stack.Screen name="infoScreen"/>
        </Stack>
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
