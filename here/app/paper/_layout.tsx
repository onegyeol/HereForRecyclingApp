import { Stack } from 'expo-router';

export default function PaperLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    />
  );
}
