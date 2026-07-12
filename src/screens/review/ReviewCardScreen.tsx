import React from 'react';
import { Pressable, View } from 'react-native';
import { TabBar } from '../../components/TabBar';
import { BlockSurface } from '../../components/BlockSurface';
import { GhostButton } from '../../components/Button';
import { Display, Label } from '../../theme/Type';
import { colors, radius, shadow } from '../../theme/colors';
import { useApp } from '../../state/AppState';

export function ReviewCardScreen() {
  const app = useApp();
  const { currentPrinciple: p, reviewIndex, principles } = app;
  const total = principles.length;
  const progressPct = Math.round(((reviewIndex + 1) / total) * 100);
  const remaining = total - reviewIndex;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 4 }}>
        <Pressable onPress={app.goHome} hitSlop={12}>
          <Label style={{ fontSize: 18, color: colors.ink, textTransform: 'none', letterSpacing: 0 }}>←</Label>
        </Pressable>
        <Label style={{ fontSize: 12, color: colors.ink }}>Review</Label>
        <Label style={{ fontSize: 11 }}>
          {reviewIndex + 1} of {total}
        </Label>
      </View>

      <View style={{ paddingHorizontal: 22, paddingTop: 16 }}>
        <View
          style={{
            height: 4,
            backgroundColor: colors.creamLight,
            borderWidth: 1,
            borderColor: colors.ink,
            borderRadius: 2,
            overflow: 'hidden',
            marginBottom: 10,
          }}
        >
          <View style={{ width: `${progressPct}%`, height: '100%', backgroundColor: colors.blue }} />
        </View>
        <Label style={{ fontSize: 10, marginBottom: 20 }}>
          {remaining} pattern{remaining === 1 ? '' : 's'} to review
        </Label>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <BlockSurface shadow={shadow.md} radius={radius.xl - 2} style={{ backgroundColor: colors.creamLight, flex: 1 }}>
          <View style={{ padding: 20, paddingHorizontal: 20, flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Label
                style={{
                  fontSize: 10,
                  color: colors.ink,
                  backgroundColor: p.verbBg,
                  borderWidth: 1.5,
                  borderColor: colors.ink,
                  borderRadius: radius.md,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}
              >
                {p.verb}
              </Label>
              <Label style={{ fontSize: 10 }}>{p.domain}</Label>
            </View>

            <Display style={{ fontSize: 23, lineHeight: 30, marginBottom: 20 }}>{p.statement}</Display>

            <View style={{ marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Label style={{ fontSize: 10 }}>Confidence</Label>
                <Label style={{ fontSize: 10, color: colors.blue }}>{p.confidence}%</Label>
              </View>
              <View style={{ height: 4, backgroundColor: colors.cream, borderWidth: 1, borderColor: colors.ink, borderRadius: 2, overflow: 'hidden' }}>
                <View style={{ width: `${p.confidence}%`, height: '100%', backgroundColor: colors.blue }} />
              </View>
            </View>

            <View style={{ flex: 1 }} />

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ flex: 1 }}>
                <GhostButton label="Reject" onPress={app.rejectPrinciple} />
              </View>
              <View style={{ flex: 1 }}>
                <GhostButton label="Edit" onPress={() => {}} />
              </View>
              <View style={{ flex: 1.4 }}>
                <BlockSurface
                  onPress={app.confirmPrinciple}
                  shadow={shadow.sm}
                  radius={radius.md}
                  style={{ backgroundColor: colors.green, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Label style={{ fontSize: 11, color: colors.ink, fontWeight: '700' }}>Confirm ✓</Label>
                </BlockSurface>
              </View>
            </View>
          </View>
        </BlockSurface>

        <View style={{ alignItems: 'center', paddingVertical: 14 }}>
          <Label style={{ fontSize: 9.5 }}>← reject · E edit · → confirm</Label>
        </View>
      </View>

      <TabBar active="review" />
    </View>
  );
}
