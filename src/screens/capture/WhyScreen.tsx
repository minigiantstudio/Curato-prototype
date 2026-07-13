import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { FikaImage } from '../../components/Placeholders';
import { Facet, FlyParticle } from '../../components/Facet';
import { Chip } from '../../components/Chip';
import { GhostButton } from '../../components/Button';
import { BlockSurface } from '../../components/BlockSurface';
import { Reveal } from '../../components/Reveal';
import { Display, SerifAccent, Body, Label } from '../../theme/Type';
import { colors, shadow, radius } from '../../theme/colors';
import { useApp } from '../../state/AppState';

const BREAKDOWN = [
  { label: 'Typography', text: 'Humanist serif, generous tracking, set small against open space.' },
  { label: 'Color', text: 'Muted ochre and deep brown — tonal, no bright accents.' },
  { label: 'References', text: "Scandinavian café identity — Aesop's restraint, Kinfolk's calm." },
];

const TAGS = ['restraint', 'serif', 'earth-tones', 'scandinavian'];

export function CaptureWhyScreen() {
  const app = useApp();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 220, borderBottomWidth: 1.5, borderBottomColor: colors.ink }}>
        <FikaImage style={{ flex: 1 }} />
        <Pressable
          onPress={app.retakeCapture}
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: colors.cream,
            borderWidth: 1.5,
            borderColor: colors.ink,
            borderRadius: radius.md,
            paddingVertical: 7,
            paddingHorizontal: 12,
          }}
        >
          <Label style={{ fontSize: 14, textTransform: 'none', letterSpacing: 0 }}>←</Label>
          <Label style={{ fontSize: 11 }}>Retake</Label>
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, paddingTop: 20 }}>
        <Reveal index={0}>
          <SerifAccent style={{ fontSize: 20, lineHeight: 28, marginBottom: 24 }}>
            A quiet serif logotype with warm, low-contrast earth tones — restraint doing the talking.
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

        <Reveal index={4}>
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              backgroundColor: colors.green,
              borderWidth: 1.5,
              borderColor: colors.ink,
              borderRadius: radius.lg,
              padding: 18,
              marginBottom: 18,
            }}
          >
            <Facet size={10} style={{ marginTop: 5 }} />
            <Body style={{ fontSize: 14.5, lineHeight: 21, flex: 1 }}>
              This is the 6th piece you've loved with muted earth tones and understated serifs. It's
              becoming one of your clearest patterns.
            </Body>
          </View>
        </Reveal>

        <Reveal index={5}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
            {TAGS.map((t) => (
              <Chip key={t} label={t} />
            ))}
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
        <FlyParticle visible={app.showKeepParticle} />
        <View style={{ flex: 1 }}>
          <GhostButton label="Not for me" onPress={app.rejectCapture} />
        </View>
        <View style={{ flex: 1.4 }}>
          <BlockSurface
            onPress={app.keepCapture}
            shadow={shadow.sm}
            radius={radius.md}
            style={{
              backgroundColor: colors.blue,
              paddingVertical: 15,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 7,
            }}
          >
            <Label style={{ fontSize: 12, color: colors.white, letterSpacing: 0.7 }}>Keep it</Label>
            <Facet size={8} color={colors.white} />
          </BlockSurface>
        </View>
      </View>
    </View>
  );
}
