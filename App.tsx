import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCuratoFonts } from './src/theme/fonts';
import { colors } from './src/theme/colors';
import { AppStateProvider } from './src/state/AppState';
import { PhoneFrame } from './src/components/PhoneFrame';
import { Router } from './src/Router';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded] = useCuratoFonts();

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayout();
  }, [onLayout]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PhoneFrame>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.cream }}>
          <AppStateProvider>
            <Router />
          </AppStateProvider>
          <StatusBar style="dark" />
        </SafeAreaView>
      </PhoneFrame>
    </SafeAreaProvider>
  );
}
