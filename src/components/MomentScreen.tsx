import React from 'react';
import { View } from 'react-native';
import { SpringFacet } from './Facet';
import { PrimaryButton, TextLink } from './Button';
import { Display, SerifAccent, Body, Mono, Label } from '../theme/Type';
import { colors } from '../theme/colors';

export function MomentScreen({
  headline,
  headlineAccent,
  description,
  stats,
  primaryLabel,
  onPrimary,
  onSecondary,
  secondaryLabel = 'Back to home',
}: {
  headline: string;
  headlineAccent?: string;
  description: string;
  stats: { value: string | number; label: string }[];
  primaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
  secondaryLabel?: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 32,
        gap: 22,
      }}
    >
      <SpringFacet size={34} />
      <View style={{ alignItems: 'center' }}>
        <Display style={{ fontSize: 30, marginBottom: 14, textAlign: 'center' }}>
          {headline}
          {headlineAccent ? <SerifAccent style={{ fontSize: 30 }}> {headlineAccent}</SerifAccent> : null}
        </Display>
        <Body style={{ fontSize: 14, lineHeight: 22, maxWidth: 270, textAlign: 'center' }}>
          {description}
        </Body>
      </View>
      <View style={{ flexDirection: 'row', gap: 40, paddingVertical: 10 }}>
        {stats.map((s, i) => (
          <View key={i} style={{ alignItems: 'center' }}>
            <Mono style={{ fontSize: 24, color: colors.blue, marginBottom: 4, fontWeight: '700' }}>
              {s.value}
            </Mono>
            <Label style={{ fontSize: 10 }}>{s.label}</Label>
          </View>
        ))}
      </View>
      <View style={{ width: '100%', marginTop: 8 }}>
        <PrimaryButton label={primaryLabel} onPress={onPrimary} />
      </View>
      <TextLink label={secondaryLabel} onPress={onSecondary} />
    </View>
  );
}
