import React from 'react';
import { View } from 'react-native';
import { BottomSheet } from '../components/BottomSheet';
import { GhostButton } from '../components/Button';
import { Body } from '../theme/Type';
import { colors } from '../theme/colors';
import { useApp } from '../state/AppState';

const ITEMS = ['Export capsule', 'Design system', 'Settings'];

export function AccountSheet() {
  const app = useApp();

  return (
    <BottomSheet visible={app.accountOpen} onClose={app.closeAccount}>
      <View
        style={{
          borderWidth: 1.5,
          borderColor: colors.ink,
          borderRadius: 6,
          overflow: 'hidden',
          marginBottom: 16,
        }}
      >
        {ITEMS.map((item, i) => (
          <View
            key={item}
            style={{
              backgroundColor: colors.creamLight,
              padding: 16,
              borderTopWidth: i === 0 ? 0 : 1.5,
              borderTopColor: colors.ink,
            }}
          >
            <Body style={{ fontSize: 14 }}>{item}</Body>
          </View>
        ))}
      </View>
      <GhostButton label="Close" onPress={app.closeAccount} />
    </BottomSheet>
  );
}
