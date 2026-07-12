import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SerifAccent } from '../theme/Type';
import { Label } from '../theme/Type';
import { colors } from '../theme/colors';

type Props = { style?: StyleProp<ViewStyle> };

/** Sample capture: a Scandinavian café logotype, muted ochre/brown earth tones. */
export function FikaImage({ style }: Props) {
  return (
    <LinearGradient
      colors={['#b5895a', '#7a5636']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ alignItems: 'center', justifyContent: 'center' }, style]}
    >
      <SerifAccent style={{ fontSize: 44, color: colors.white }}>Fika</SerifAccent>
    </LinearGradient>
  );
}

export function OptionAGradient({ style }: Props) {
  return (
    <LinearGradient
      colors={['#a3a3a3', '#5a5a5a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
      style={[{ alignItems: 'center', justifyContent: 'center' }, style]}
    />
  );
}

export function OptionBGradient({ style }: Props) {
  return (
    <LinearGradient
      colors={['#3346cf', '#22308f']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
      style={[{ alignItems: 'center', justifyContent: 'center' }, style]}
    />
  );
}

/** A saturated, slightly off-brand café Instagram post. */
export function SummerBlendImage({ style, compact }: Props & { compact?: boolean }) {
  return (
    <LinearGradient
      colors={['#7fb862', '#4a8a37']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
      style={[{ alignItems: 'center', justifyContent: 'center', gap: compact ? 0 : 10 }, style]}
    >
      <Label
        style={{
          fontFamily: undefined,
          fontWeight: '700',
          fontSize: compact ? 16 : 22,
          color: colors.white,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        }}
      >
        Summer Blend
      </Label>
      {!compact && (
        <Label style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>Now Pouring</Label>
      )}
    </LinearGradient>
  );
}
