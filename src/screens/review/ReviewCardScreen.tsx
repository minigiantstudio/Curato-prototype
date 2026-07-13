import React from 'react';
import { Pressable, View } from 'react-native';
import { TabBar } from '../../components/TabBar';
import { SwipeableReviewCard } from '../../components/SwipeableReviewCard';
import { AnimatedBar } from '../../components/AnimatedBar';
import { Label } from '../../theme/Type';
import { colors } from '../../theme/colors';
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
        <AnimatedBar percent={progressPct} height={5} style={{ marginBottom: 10 }} />
        <Label style={{ fontSize: 11, marginBottom: 20 }}>
          {remaining} pattern{remaining === 1 ? '' : 's'} to review
        </Label>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <SwipeableReviewCard
          key={reviewIndex}
          principle={p}
          hasNext={reviewIndex < total - 1}
          onReject={app.rejectPrinciple}
          onConfirm={app.confirmPrinciple}
        />

        <View style={{ alignItems: 'center', paddingVertical: 14 }}>
          <Label style={{ fontSize: 9.5 }}>← reject · E edit · → confirm</Label>
        </View>
      </View>

      <TabBar active="review" />
    </View>
  );
}
