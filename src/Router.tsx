import React from 'react';
import { View } from 'react-native';
import { useApp } from './state/AppState';
import { HomeScreen } from './screens/HomeScreen';
import { AccountSheet } from './screens/AccountSheet';
import { CaptureUploadScreen } from './screens/capture/UploadScreen';
import { CaptureReadingScreen } from './screens/capture/ReadingScreen';
import { CaptureWhyScreen } from './screens/capture/WhyScreen';
import { CaptureKeptScreen } from './screens/capture/KeptScreen';
import { CompareUploadScreen } from './screens/compare/UploadScreen';
import { CompareComparingScreen } from './screens/compare/ComparingScreen';
import { CompareResultScreen } from './screens/compare/ResultScreen';
import { CompareSavedScreen } from './screens/compare/SavedScreen';
import { BrandUploadScreen } from './screens/brand/UploadScreen';
import { BrandPickerSheet } from './screens/brand/BrandPickerSheet';
import { BrandAnalyzingScreen } from './screens/brand/AnalyzingScreen';
import { BrandVerdictScreen } from './screens/brand/VerdictScreen';
import { ReviewCardScreen } from './screens/review/ReviewCardScreen';
import { ReviewConfirmedScreen } from './screens/review/ConfirmedScreen';

export function Router() {
  const app = useApp();

  let screen: React.ReactNode;
  switch (app.screen) {
    case 'home':
      screen = <HomeScreen />;
      break;
    case 'capture_upload':
      screen = <CaptureUploadScreen />;
      break;
    case 'capture_reading':
      screen = <CaptureReadingScreen />;
      break;
    case 'capture_why':
      screen = <CaptureWhyScreen />;
      break;
    case 'capture_kept':
      screen = <CaptureKeptScreen />;
      break;
    case 'compare_upload':
      screen = <CompareUploadScreen />;
      break;
    case 'compare_comparing':
      screen = <CompareComparingScreen />;
      break;
    case 'compare_result':
      screen = <CompareResultScreen />;
      break;
    case 'compare_saved':
      screen = <CompareSavedScreen />;
      break;
    case 'brand_upload':
      screen = <BrandUploadScreen />;
      break;
    case 'brand_analyzing':
      screen = <BrandAnalyzingScreen />;
      break;
    case 'brand_verdict':
      screen = <BrandVerdictScreen />;
      break;
    case 'review_card':
      screen = <ReviewCardScreen />;
      break;
    case 'review_confirmed':
      screen = <ReviewConfirmedScreen />;
      break;
  }

  return (
    <View style={{ flex: 1 }}>
      {screen}
      <AccountSheet />
      <BrandPickerSheet />
    </View>
  );
}
