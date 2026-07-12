import React from 'react';
import { Pressable, View } from 'react-native';
import { TopBar } from '../../components/TopBar';
import { PrimaryButton } from '../../components/Button';
import { SummerBlendImage } from '../../components/Placeholders';
import { Display, SerifAccent, Body, Label } from '../../theme/Type';
import { colors, radius } from '../../theme/colors';
import { useApp } from '../../state/AppState';

export function BrandUploadScreen() {
  const app = useApp();

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Brand Check" onBack={app.goHome} />
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 0 }}>
        <Display style={{ fontSize: 28, lineHeight: 33, marginBottom: 10 }}>
          Does this fit your <SerifAccent style={{ fontSize: 28 }}>brand?</SerifAccent>
        </Display>
        <Body style={{ fontSize: 13.5, lineHeight: 20, marginBottom: 18 }}>
          Upload a post or design. Curato checks it against your brand's confirmed taste.
        </Body>

        <Pressable
          onPress={app.setBrandImage}
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
          {app.brandHasImage ? (
            <SummerBlendImage style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
          ) : (
            <Body style={{ fontSize: 14 }}>Upload the post to check</Body>
          )}
        </Pressable>

        <View style={{ paddingVertical: 16 }}>
          <PrimaryButton label="Choose brand →" onPress={app.openBrandSheet} disabled={!app.brandHasImage} />
          <Label style={{ textAlign: 'center', fontSize: 10, marginTop: 10 }}>
            One image · checked against your saved brand
          </Label>
        </View>
      </View>
    </View>
  );
}
