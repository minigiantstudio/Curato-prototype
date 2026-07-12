import React from 'react';
import { View } from 'react-native';
import { Mono } from '../theme/Type';
import { colors, radius } from '../theme/colors';

export function Chip({ label }: { label: string }) {
  return (
    <View
      style={{
        borderWidth: 1.5,
        borderColor: colors.ink,
        backgroundColor: colors.creamLight,
        borderRadius: 100,
        paddingVertical: 6,
        paddingHorizontal: 12,
      }}
    >
      <Mono style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.8, color: colors.ink }}>
        {label}
      </Mono>
    </View>
  );
}
