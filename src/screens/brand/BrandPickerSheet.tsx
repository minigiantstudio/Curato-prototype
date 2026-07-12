import React from 'react';
import { Pressable, View } from 'react-native';
import { BottomSheet } from '../../components/BottomSheet';
import { Display, SerifAccent, Body, Label } from '../../theme/Type';
import { colors, radius } from '../../theme/colors';
import { useApp } from '../../state/AppState';

const BRANDS = [
  { initial: 'P', color: '#b5895a', name: 'Plural Café', meta: '18 principles · restraint, muted, editorial' },
  { initial: 'N', color: '#1c1b1a', name: 'Norr Studio', meta: '11 principles · bold, high-contrast' },
  { initial: 'V', color: '#4a8a37', name: 'Verdant', meta: '7 principles · organic, earthy' },
];

export function BrandPickerSheet() {
  const app = useApp();

  return (
    <BottomSheet visible={app.brandSheetOpen} onClose={app.closeBrandSheet}>
      <Display style={{ fontSize: 20, marginBottom: 18 }}>
        Check against which <SerifAccent style={{ fontSize: 20 }}>brand?</SerifAccent>
      </Display>
      <View style={{ borderWidth: 1.5, borderColor: colors.ink, borderRadius: radius.lg, overflow: 'hidden' }}>
        {BRANDS.map((b, i) => (
          <Pressable
            key={b.name}
            onPress={() => app.pickBrand(b.name)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
              backgroundColor: colors.creamLight,
              padding: 16,
              borderTopWidth: i === 0 ? 0 : 1.5,
              borderTopColor: colors.ink,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: radius.md,
                backgroundColor: b.color,
                borderWidth: 1.5,
                borderColor: colors.ink,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SerifAccent style={{ color: colors.white, fontSize: 16 }}>{b.initial}</SerifAccent>
            </View>
            <View style={{ flex: 1 }}>
              <Body semiBold style={{ fontSize: 14, marginBottom: 3 }}>
                {b.name}
              </Body>
              <Label style={{ fontSize: 9.5 }}>{b.meta}</Label>
            </View>
          </Pressable>
        ))}
      </View>
    </BottomSheet>
  );
}
