import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { FikaImage } from '../../components/Placeholders';
import { Facet, FlyParticle } from '../../components/Facet';
import { Chip } from '../../components/Chip';
import { GhostButton } from '../../components/Button';
import { BlockSurface } from '../../components/BlockSurface';
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
          <Label style={{ fontSize: 13, textTransform: 'none', letterSpacing: 0 }}>←</Label>
          <Label style={{ fontSize: 10 }}>Retake</Label>
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 22, paddingTop: 18 }}>
        <SerifAccent style={{ fontSize: 18, lineHeight: 25, marginBottom: 20 }}>
          A quiet serif logotype with warm, low-contrast earth tones — restraint doing the talking.
        </SerifAccent>

        <View style={{ gap: 14, marginBottom: 20 }}>
          {BREAKDOWN.map((row) => (
            <View key={row.label}>
              <Label style={{ fontSize: 10, color: colors.blue, marginBottom: 4 }}>{row.label}</Label>
              <Body style={{ fontSize: 13, lineHeight: 19 }}>{row.text}</Body>
            </View>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            backgroundColor: colors.green,
            borderWidth: 1.5,
            borderColor: colors.ink,
            borderRadius: radius.lg,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <Facet size={9} style={{ marginTop: 4 }} />
          <Body style={{ fontSize: 13, lineHeight: 19, flex: 1 }}>
            This is the 6th piece you've loved with muted earth tones and understated serifs. It's
            becoming one of your clearest patterns.
          </Body>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
          {TAGS.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </View>
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
