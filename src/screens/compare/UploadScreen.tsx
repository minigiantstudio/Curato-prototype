import React from 'react';
import { Pressable, View } from 'react-native';
import { TopBar } from '../../components/TopBar';
import { TabBar } from '../../components/TabBar';
import { PrimaryButton } from '../../components/Button';
import { OptionAGradient, OptionBGradient } from '../../components/Placeholders';
import { Display, SerifAccent, Body, Label } from '../../theme/Type';
import { colors, radius } from '../../theme/colors';
import { useApp } from '../../state/AppState';

function OptionSlot({
  hasImage,
  onPress,
  label,
  Gradient,
}: {
  hasImage: boolean;
  onPress: () => void;
  label: string;
  Gradient: React.ComponentType<{ style?: any }>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
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
      {hasImage ? (
        <Gradient style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      ) : (
        <View style={{ alignItems: 'center', gap: 8 }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: colors.ink }} />
          <Label style={{ fontSize: 10 }}>{label}</Label>
        </View>
      )}
    </Pressable>
  );
}

export function CompareUploadScreen() {
  const app = useApp();
  const ready = app.compareHasA && app.compareHasB;

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Compare" onBack={app.goHome} />
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 4 }}>
        <Display style={{ fontSize: 26, lineHeight: 31, marginBottom: 10 }}>
          Two <SerifAccent style={{ fontSize: 26 }}>directions?</SerifAccent>
        </Display>
        <Body style={{ fontSize: 15, lineHeight: 22, marginBottom: 22 }}>
          Upload both options. Curato tells you which fits your taste.
        </Body>

        <View style={{ flexDirection: 'row', gap: 12, flex: 1, minHeight: 260 }}>
          <OptionSlot hasImage={app.compareHasA} onPress={app.setCompareA} label="Option A" Gradient={OptionAGradient} />
          <OptionSlot hasImage={app.compareHasB} onPress={app.setCompareB} label="Option B" Gradient={OptionBGradient} />
        </View>

        <View style={{ paddingVertical: 16 }}>
          <PrimaryButton label="Compare →" onPress={app.startComparing} disabled={!ready} />
          <Label style={{ textAlign: 'center', fontSize: 11, marginTop: 10 }}>
            Weighed against your confirmed taste
          </Label>
        </View>
      </View>
      <TabBar active="compare" />
    </View>
  );
}
