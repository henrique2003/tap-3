import {
  Goldman_400Regular,
  Goldman_700Bold
} from '@expo-google-fonts/goldman';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter';

import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import "@/src/styles/global.css";
import { useEffect } from 'react';

import { Providers } from '../components';
import '../lib/i18n';

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_300Light,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  const [loaded2] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_300Light,
    Inter_500Medium,
    Inter_600SemiBold,
    Goldman_400Regular,
    Goldman_700Bold,
  });


  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  if (!loaded && !loaded2) {
    return <></>;
  }

  return (
    <Providers>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="register-user" />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </Providers>
  );
}
