import React from 'react';
import { View } from 'react-native';
import { DimmedLoading } from '../../components/DimmedLoading';
import { colors } from '../../theme/colors';
import { useApp } from '../../state/AppState';

function BrandMark() {
  return (
    <View
      style={{
        width: 30,
        height: 30,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: 20, height: 20, backgroundColor: colors.blue, transform: [{ rotate: '45deg' }] }} />
    </View>
  );
}

export function BrandAnalyzingScreen() {
  const app = useApp();

  return (
    <DimmedLoading backgroundColors={['#7fb862', '#4a8a37']} caption={`Checking against ${app.brandName}…`}>
      <BrandMark />
    </DimmedLoading>
  );
}
