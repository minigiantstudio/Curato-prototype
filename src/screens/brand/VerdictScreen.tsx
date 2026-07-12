import React from 'react';
import { ScrollView, View } from 'react-native';
import { SummerBlendImage } from '../../components/Placeholders';
import { GhostButton, TextLink } from '../../components/Button';
import { Display, Body, Label, SerifAccent } from '../../theme/Type';
import { colors, radius } from '../../theme/colors';
import { useApp } from '../../state/AppState';

const FITS = [
  'The serif logotype honors your generous tracking at display scale.',
  'Centered composition matches your editorial calm.',
];
const DRIFTS = [
  'The saturated green fights your muted, tonal palette principle.',
  'The text drop shadow conflicts with your no-digital-effects rule.',
];

export function BrandVerdictScreen() {
  const app = useApp();

  return (
    <View style={{ flex: 1 }}>
      <SummerBlendImage
        compact
        style={{ height: 150, borderBottomWidth: 1.5, borderBottomColor: colors.ink }}
      />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 22, paddingTop: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
          <Display style={{ fontSize: 36, color: colors.orange }}>72%</Display>
          <Label
            style={{
              fontSize: 10,
              color: colors.ink,
              backgroundColor: colors.orange,
              borderWidth: 1.5,
              borderColor: colors.ink,
              borderRadius: radius.md,
              paddingVertical: 3,
              paddingHorizontal: 8,
            }}
          >
            On-Brand
          </Label>
        </View>
        <Label style={{ fontSize: 10, marginBottom: 18 }}>
          Checked against {app.brandName} · 18 principles
        </Label>

        <Label
          style={{
            fontSize: 10,
            color: colors.ink,
            backgroundColor: colors.green,
            alignSelf: 'flex-start',
            paddingVertical: 3,
            paddingHorizontal: 8,
            borderRadius: radius.sm,
            marginBottom: 8,
          }}
        >
          What Fits
        </Label>
        <View style={{ gap: 10, marginBottom: 18 }}>
          {FITS.map((t) => (
            <View key={t} style={{ flexDirection: 'row', gap: 10 }}>
              <Body style={{ fontSize: 13 }}>✓</Body>
              <Body style={{ fontSize: 12.5, lineHeight: 19, flex: 1 }}>{t}</Body>
            </View>
          ))}
        </View>

        <Label
          style={{
            fontSize: 10,
            color: colors.ink,
            backgroundColor: colors.orange,
            alignSelf: 'flex-start',
            paddingVertical: 3,
            paddingHorizontal: 8,
            borderRadius: radius.sm,
            marginBottom: 8,
          }}
        >
          What Drifts
        </Label>
        <View style={{ gap: 10, marginBottom: 18 }}>
          {DRIFTS.map((t) => (
            <View key={t} style={{ flexDirection: 'row', gap: 10 }}>
              <Body style={{ fontSize: 13 }}>✗</Body>
              <Body style={{ fontSize: 12.5, lineHeight: 19, flex: 1 }}>{t}</Body>
            </View>
          ))}
        </View>

        <View style={{ borderLeftWidth: 3, borderLeftColor: colors.blue, paddingLeft: 16, marginBottom: 18 }}>
          <Label style={{ fontSize: 10, color: colors.blue, marginBottom: 8 }}>How To Make It Fit</Label>
          <SerifAccent style={{ fontSize: 14.5, lineHeight: 22 }}>
            Pull the background toward your established muted greens and flatten the shadow into a solid
            ground. The composition and type are already yours.
          </SerifAccent>
        </View>
      </ScrollView>

      <View style={{ gap: 10, padding: 22, paddingTop: 14, borderTopWidth: 1.5, borderTopColor: colors.ink }}>
        <GhostButton label="Check another" onPress={app.goBrandUploadReset} />
        <View style={{ alignItems: 'center' }}>
          <TextLink label="← Back to home" onPress={app.goHome} />
        </View>
      </View>
    </View>
  );
}
