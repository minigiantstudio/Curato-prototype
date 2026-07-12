import React from 'react';
import { Pressable, View } from 'react-native';
import { BlockSurface } from '../components/BlockSurface';
import { Facet } from '../components/Facet';
import { TabBar } from '../components/TabBar';
import { Display, SerifAccent, Body, Label, Mono } from '../theme/Type';
import { colors, radius, shadow } from '../theme/colors';
import { useApp } from '../state/AppState';

export function HomeScreen() {
  const app = useApp();

  return (
    <View style={{ flex: 1 }}>
      {/* Top bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 22,
          paddingBottom: 8,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Facet size={10} />
          <Label style={{ fontSize: 13, color: colors.ink }}>Curato</Label>
        </View>
        <Pressable
          onPress={app.openAccount}
          style={{
            width: 32,
            height: 32,
            borderRadius: radius.md,
            backgroundColor: colors.creamLight,
            borderWidth: 1.5,
            borderColor: colors.ink,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Label style={{ fontSize: 13, color: colors.ink }}>M</Label>
        </Pressable>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24 }}>
        {/* Capture hero */}
        <BlockSurface
          onPress={app.goCaptureUpload}
          shadow={shadow.md}
          radius={radius.lg}
          style={{ backgroundColor: colors.blue, marginBottom: 24 }}
        >
          <View style={{ paddingTop: 28, paddingHorizontal: 24, paddingBottom: 76, overflow: 'hidden' }}>
            <Label style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 14 }}>
              (01) · Capture
            </Label>
            <Display style={{ fontSize: 30, lineHeight: 34, color: colors.white, marginBottom: 12, maxWidth: 230 }}>
              Saw something you <SerifAccent style={{ fontSize: 30, color: colors.white }}>love?</SerifAccent>
            </Display>
            <Body style={{ fontSize: 14, lineHeight: 21, color: 'rgba(255,255,255,0.82)', maxWidth: 210 }}>
              Capture it. Curato tells you why it caught your eye — and how it fits your taste.
            </Body>
            <View
              style={{
                position: 'absolute',
                bottom: 18,
                right: 20,
                width: 56,
                height: 56,
                borderRadius: 28,
                borderWidth: 2,
                borderColor: 'rgba(255,255,255,0.6)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  borderWidth: 2,
                  borderColor: 'rgba(255,255,255,0.6)',
                }}
              />
            </View>
          </View>
        </BlockSurface>

        {/* Secondary actions */}
        <View style={{ gap: 12, marginBottom: 24 }}>
          <BlockSurface
            onPress={app.goCompareUpload}
            shadow={shadow.sm}
            radius={radius.lg}
            style={{ backgroundColor: colors.creamLight }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 }}>
              <Label style={{ fontSize: 18, width: 22, textAlign: 'center', color: colors.ink, textTransform: 'none', letterSpacing: 0 }}>
                ⚖
              </Label>
              <View style={{ flex: 1 }}>
                <Label style={{ fontSize: 12, color: colors.ink, marginBottom: 3 }}>Compare options</Label>
                <Body style={{ fontSize: 12.5, lineHeight: 17 }}>Two directions? Get a recommendation.</Body>
              </View>
            </View>
          </BlockSurface>

          <BlockSurface
            onPress={app.goBrandUpload}
            shadow={shadow.sm}
            radius={radius.lg}
            style={{ backgroundColor: colors.creamLight }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 }}>
              <Label style={{ fontSize: 18, width: 22, textAlign: 'center', color: colors.ink, textTransform: 'none', letterSpacing: 0 }}>
                ◑
              </Label>
              <View style={{ flex: 1 }}>
                <Label style={{ fontSize: 12, color: colors.ink, marginBottom: 3 }}>Brand check</Label>
                <Body style={{ fontSize: 12.5, lineHeight: 17 }}>Does this match one of your brands?</Body>
              </View>
            </View>
          </BlockSurface>
        </View>

        {/* Ambient insight line */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingHorizontal: 2 }}>
          <Facet size={7} style={{ marginTop: 5 }} />
          <SerifAccent style={{ fontSize: 14.5, lineHeight: 22, color: colors.inkSoft, flex: 1 }}>
            You've confirmed {app.principlesConfirmed} principles this month. Restraint is becoming your
            clearest pattern.
          </SerifAccent>
        </View>
      </View>

      <TabBar active="home" />
    </View>
  );
}
