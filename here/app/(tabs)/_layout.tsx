import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="camera"
        options={{
          headerShown: false, // ✅ 헤더 제거
        }}
      />
    </Stack>
  );
}
