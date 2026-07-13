import React, { useRef } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { Label } from '../theme/Type';
import { colors } from '../theme/colors';
import { useApp, Screen } from '../state/AppState';

type TabKey = 'home' | 'capture' | 'review' | 'compare';

const TABS: { key: TabKey; icon: string; label: string; screen: Screen }[] = [
  { key: 'home', icon: '■', label: 'Home', screen: 'home' },
  { key: 'capture', icon: '◉', label: 'Capture', screen: 'capture_upload' },
  { key: 'review', icon: '✓', label: 'Review', screen: 'review_card' },
  { key: 'compare', icon: '⚖', label: 'Compare', screen: 'compare_upload' },
];

/** A single tab that gently scales down while pressed — quiet tactile feedback. */
function Tab({
  icon,
  label,
  isActive,
  showBadge,
  onPress,
}: {
  icon: string;
  label: string;
  isActive: boolean;
  showBadge?: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const color = isActive ? colors.blue : colors.inkSoft;

  const press = (to: number) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 40, bounciness: 0 }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => press(0.88)}
      onPressOut={() => press(1)}
      style={{ alignItems: 'center', minWidth: 48, paddingVertical: 4 }}
    >
      <Animated.View style={{ alignItems: 'center', gap: 5, transform: [{ scale }] }}>
        <View>
          <Label style={{ fontSize: 19, color, textTransform: 'none', letterSpacing: 0 }}>{icon}</Label>
          {showBadge && (
            <View
              style={{
                position: 'absolute',
                top: -4,
                right: -8,
                backgroundColor: colors.blue,
                width: 15,
                height: 15,
                borderRadius: 3,
                borderWidth: 1.5,
                borderColor: colors.ink,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Label style={{ fontSize: 9, color: colors.white, letterSpacing: 0 }}>3</Label>
            </View>
          )}
        </View>
        <Label style={{ fontSize: 11.5, color, letterSpacing: 0.5 }}>{label}</Label>
      </Animated.View>
    </Pressable>
  );
}

export function TabBar({ active }: { active: TabKey }) {
  const app = useApp();

  const go = (screen: Screen) => {
    if (screen === 'home') app.goHome();
    else if (screen === 'capture_upload') app.goCaptureUpload();
    else if (screen === 'review_card') app.goReviewCard();
    else if (screen === 'compare_upload') app.goCompareUpload();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: 1.5,
        borderTopColor: colors.ink,
        paddingTop: 12,
        paddingBottom: 22,
        paddingHorizontal: 8,
        backgroundColor: colors.cream,
      }}
    >
      {TABS.map((tab) => (
        <Tab
          key={tab.key}
          icon={tab.icon}
          label={tab.label}
          isActive={tab.key === active}
          showBadge={tab.key === 'review'}
          onPress={() => go(tab.screen)}
        />
      ))}
    </View>
  );
}
