import React from 'react';
import { Pressable, View } from 'react-native';
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
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        const color = isActive ? colors.blue : colors.inkSoft;
        return (
          <Pressable
            key={tab.key}
            onPress={() => go(tab.screen)}
            style={{ alignItems: 'center', gap: 6, minWidth: 48, paddingVertical: 4 }}
          >
            <View>
              <Label style={{ fontSize: 15, color, textTransform: 'none', letterSpacing: 0 }}>
                {tab.icon}
              </Label>
              {tab.key === 'review' && (
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
            <Label style={{ fontSize: 9.5, color }}>{tab.label}</Label>
          </Pressable>
        );
      })}
    </View>
  );
}
