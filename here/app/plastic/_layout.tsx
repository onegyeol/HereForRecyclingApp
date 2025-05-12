import { Stack } from 'expo-router';

export default function PlasticLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // plastic 내부 모든 스크린에서 헤더 숨김
      }}
    />
  );
}
