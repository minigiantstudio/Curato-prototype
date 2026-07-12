import React from 'react';
import { View } from 'react-native';
import { BlockSurface } from './BlockSurface';
import { Facet } from './Facet';
import { Mono } from '../theme/Type';
import { colors, radius, shadow } from '../theme/colors';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  wide?: boolean;
  withFacet?: boolean;
};

/** Primary CTA — solid blue, block shadow, ink border. */
export function PrimaryButton({ label, onPress, disabled, wide, withFacet }: ButtonProps) {
  return (
    <BlockSurface
      onPress={onPress}
      disabled={disabled}
      shadow={disabled ? 0 : shadow.md}
      radius={radius.md}
      style={{
        backgroundColor: disabled ? '#b5b5b5' : colors.blue,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        width: wide ? undefined : '100%',
        flexDirection: 'row',
        gap: 7,
      }}
    >
      <Mono
        style={{
          fontSize: 13,
          textTransform: 'uppercase',
          letterSpacing: 1.2,
          color: disabled ? colors.inkSoft : colors.white,
          fontWeight: '600',
        }}
      >
        {label}
      </Mono>
      {withFacet && <Facet size={8} color={disabled ? colors.inkSoft : colors.white} />}
    </BlockSurface>
  );
}

/** Secondary / ghost action — quiet, cream surface, hairline border, no shadow by default. */
export function GhostButton({ label, onPress, disabled, flex }: ButtonProps & { flex?: number }) {
  return (
    <BlockSurface
      onPress={onPress}
      disabled={disabled}
      radius={radius.md}
      style={{
        backgroundColor: colors.cream,
        paddingVertical: 15,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flex,
      }}
    >
      <Mono
        style={{
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          color: colors.ink,
          fontWeight: '600',
        }}
      >
        {label}
      </Mono>
    </BlockSurface>
  );
}

/** Quiet text-only link — "Back to home" style. */
export function TextLink({ label, onPress }: ButtonProps) {
  return (
    <View>
      <Mono
        onPress={onPress}
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: colors.inkSoft,
          fontWeight: '600',
        }}
      >
        {label}
      </Mono>
    </View>
  );
}
