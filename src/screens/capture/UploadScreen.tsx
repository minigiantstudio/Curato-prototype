import React from 'react';
import { View } from 'react-native';
import { TopBar } from '../../components/TopBar';
import { TabBar } from '../../components/TabBar';
import { PrimaryButton } from '../../components/Button';
import { FikaImage } from '../../components/Placeholders';
import { Display, SerifAccent, Body, Label } from '../../theme/Type';
import { colors, radius } from '../../theme/colors';
import { useApp } from '../../state/AppState';
import { Pressable } from 'react-native';

export function CaptureUploadScreen() {
  const app = useApp();

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Capture" onBack={app.goHome} />
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 4 }}>
        <Display style={{ fontSize: 28, lineHeight: 33, marginBottom: 10 }}>
          What caught your <SerifAccent style={{ fontSize: 28 }}>eye?</SerifAccent>
        </Display>
        <Body style={{ fontSize: 15, lineHeight: 22, marginBottom: 22 }}>
          Snap it or upload it. Curato reads it and tells you why it stopped you.
        </Body>

        <Pressable
          onPress={app.setCaptureImage}
          style={{
            flex: 1,
            minHeight: 300,
            borderWidth: 1.5,
            borderColor: colors.ink,
            borderStyle: 'dashed',
            borderRadius: radius.lg,
            backgroundColor: colors.creamLight,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {app.captureHasImage ? (
            <FikaImage style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
          ) : (
            <View style={{ alignItems: 'center', gap: 14, padding: 24 }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  borderWidth: 2,
                  borderColor: colors.ink,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{ width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: colors.ink }}
                />
              </View>
              <Body style={{ fontSize: 14.5, textAlign: 'center' }}>Tap to capture or upload</Body>
              <Label style={{ fontSize: 11, maxWidth: 180, textAlign: 'center', lineHeight: 17 }}>
                A sign, a page, a wall, a screen — anything.
              </Label>
            </View>
          )}
        </Pressable>

        <View style={{ paddingVertical: 16 }}>
          <PrimaryButton label="Read this →" onPress={app.startReading} disabled={!app.captureHasImage} />
          <Label style={{ textAlign: 'center', fontSize: 11, marginTop: 10 }}>
            Curato analyzes it · you decide if it's yours
          </Label>
        </View>
      </View>
      <TabBar active="capture" />
    </View>
  );
}
