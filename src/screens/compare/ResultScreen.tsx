import React from 'react';
import { ScrollView, View } from 'react-native';
import { OptionAGradient, OptionBGradient } from '../../components/Placeholders';
import { Facet, FlyParticle } from '../../components/Facet';
import { GhostButton } from '../../components/Button';
import { BlockSurface } from '../../components/BlockSurface';
import { Reveal } from '../../components/Reveal';
import { SerifAccent, Body, Label } from '../../theme/Type';
import { colors, radius, shadow } from '../../theme/colors';
import { useApp } from '../../state/AppState';

const BREAKDOWN = [
  { label: 'Color', text: "B's tonal violet-grey stays within your muted range; A's palette reads saturated." },
  { label: 'Composition', text: 'Both are centered — this one’s a wash.' },
];

export function CompareResultScreen() {
  const app = useApp();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 20, paddingBottom: 4 }}>
        <Label style={{ fontSize: 13, color: colors.ink }}>Recommendation</Label>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, paddingTop: 14 }}>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <View style={{ flex: 1, height: 110, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1.5, borderColor: colors.ink, opacity: 0.6 }}>
            <OptionAGradient style={{ flex: 1 }} />
            <Label style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 9.5, color: colors.white }}>
              Option A
            </Label>
          </View>
          <View style={{ flex: 1 }}>
            <BlockSurface shadow={shadow.sm} radius={radius.lg} borderWidth={2} style={{ height: 110, overflow: 'hidden' }}>
              <OptionBGradient style={{ flex: 1 }} />
              <Label
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: colors.green,
                  color: colors.ink,
                  fontSize: 8.5,
                  paddingVertical: 3,
                  paddingHorizontal: 7,
                  borderRadius: radius.sm,
                  borderWidth: 1.5,
                  borderColor: colors.ink,
                }}
              >
                Recommended
              </Label>
              <Label style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 9.5, color: colors.white }}>
                Option B
              </Label>
            </BlockSurface>
          </View>
        </View>

        <Reveal index={0}>
          <SerifAccent style={{ fontSize: 20, lineHeight: 28, marginBottom: 22 }}>
            Option B holds your restraint — the high-contrast type in A fights your muted-palette principle.
          </SerifAccent>
        </Reveal>

        <View style={{ gap: 18, marginBottom: 22 }}>
          {BREAKDOWN.map((row, i) => (
            <Reveal key={row.label} index={i + 1}>
              <Label style={{ fontSize: 11, color: colors.blue, marginBottom: 5 }}>{row.label}</Label>
              <Body style={{ fontSize: 14.5, lineHeight: 21 }}>{row.text}</Body>
            </Reveal>
          ))}
        </View>

        <Reveal index={3}>
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              backgroundColor: colors.green,
              borderWidth: 1.5,
              borderColor: colors.ink,
              borderRadius: radius.lg,
              padding: 18,
              marginBottom: 16,
            }}
          >
            <Facet size={10} style={{ marginTop: 5 }} />
            <Body style={{ fontSize: 14.5, lineHeight: 21, flex: 1 }}>
              This is the 4th comparison where the muted option won. Restraint keeps winning.
            </Body>
          </View>
        </Reveal>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          padding: 22,
          paddingTop: 14,
          borderTopWidth: 1.5,
          borderTopColor: colors.ink,
        }}
      >
        <FlyParticle visible={app.showSaveParticle} />
        <View style={{ flex: 1 }}>
          <GhostButton label="Not now" onPress={app.goHome} />
        </View>
        <View style={{ flex: 1.4 }}>
          <BlockSurface
            onPress={app.saveCompareInsights}
            shadow={shadow.sm}
            radius={radius.md}
            style={{ backgroundColor: colors.blue, paddingVertical: 15, alignItems: 'center', justifyContent: 'center' }}
          >
            <Label style={{ fontSize: 12, color: colors.white, letterSpacing: 0.7 }}>Save insights</Label>
          </BlockSurface>
        </View>
      </View>
    </View>
  );
}
