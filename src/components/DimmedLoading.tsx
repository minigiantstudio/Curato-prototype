import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Label } from '../theme/Type';
import { colors } from '../theme/colors';

/**
 * Full-bleed backdrop for "processing" moments (Reading / Comparing /
 * Analyzing): the source image dimmed under a dark scrim, mark pulsing at
 * center, mono caption below. Calm and elegant, not a techy spinner.
 */
export function DimmedLoading({
  backgroundColors,
  caption,
  children,
}: {
  backgroundColors: [string, string];
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={backgroundColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.3, y: 1 }}
        style={{ ...({ position: 'absolute' } as const), top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.68)',
        }}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 22 }}>
        {children}
        <Label style={{ fontSize: 13, color: colors.white, letterSpacing: 2.2 }}>{caption}</Label>
      </View>
    </View>
  );
}
