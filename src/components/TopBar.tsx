import React from 'react';
import { Pressable, View } from 'react-native';
import { Label } from '../theme/Type';
import { colors } from '../theme/colors';

export function TopBar({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
      }}
    >
      {onBack && (
        <Pressable onPress={onBack} style={{ position: 'absolute', left: 20 }} hitSlop={12}>
          <Label style={{ fontSize: 18, color: colors.ink, textTransform: 'none', letterSpacing: 0 }}>
            ←
          </Label>
        </Pressable>
      )}
      <Label style={{ fontSize: 12, color: colors.ink }}>{title}</Label>
      {right && <View style={{ position: 'absolute', right: 20 }}>{right}</View>}
    </View>
  );
}
