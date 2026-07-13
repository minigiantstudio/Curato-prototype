import React, { useEffect, useRef } from 'react';
import { Animated, PanResponder, View } from 'react-native';
import { BlockSurface } from './BlockSurface';
import { GhostButton } from './Button';
import { AnimatedBar } from './AnimatedBar';
import { Display, Label } from '../theme/Type';
import { colors, radius, shadow } from '../theme/colors';
import { motion } from '../motion/tokens';
import type { Principle } from '../data/principles';

const SWIPE_THRESHOLD = 110;
// PanResponder velocity is in px/ms; ~0.8 is a decisive flick.
const VELOCITY_THRESHOLD = 0.8;
const FLY_DISTANCE = 500;

/**
 * The Review flow's signature interaction — drag the card left to reject,
 * right to confirm (mirrors the "← reject · confirm →" hint already printed
 * below it). The Reject/Confirm buttons trigger the exact same fly-off
 * animation programmatically, so tapping and swiping read as one system.
 *
 * Built on React Native's core Animated + PanResponder (no Reanimated / Gesture
 * Handler) so it runs in Expo Go with no native-worklets setup. The dragged
 * view keeps a single JS-driven animation driver throughout to avoid any
 * mixed-driver conflict.
 */
export function SwipeableReviewCard({
  principle: p,
  hasNext,
  onReject,
  onConfirm,
}: {
  principle: Principle;
  hasNext: boolean;
  onReject: () => void;
  onConfirm: () => void;
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: motion.duration.reveal,
      easing: motion.easing,
      useNativeDriver: false,
    }).start();
  }, [enter]);

  const flyOff = (direction: 1 | -1, onComplete: () => void) => {
    Animated.timing(translateX, {
      toValue: direction * FLY_DISTANCE,
      duration: 220,
      easing: motion.easing,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) onComplete();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 6 && Math.abs(g.dx) > Math.abs(g.dy),
      onPanResponderMove: (_, g) => {
        translateX.setValue(g.dx);
      },
      onPanResponderRelease: (_, g) => {
        const past =
          Math.abs(g.dx) > SWIPE_THRESHOLD || Math.abs(g.vx) > VELOCITY_THRESHOLD;
        if (past) {
          const dir: 1 | -1 = g.dx > 0 ? 1 : -1;
          Animated.timing(translateX, {
            toValue: dir * FLY_DISTANCE,
            duration: 220,
            easing: motion.easing,
            useNativeDriver: false,
          }).start(({ finished }) => {
            if (finished) (dir > 0 ? onConfirm : onReject)();
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            ...motion.spring.settle,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const rotate = translateX.interpolate({
    inputRange: [-200, 200],
    outputRange: ['-8deg', '8deg'],
    extrapolate: 'clamp',
  });
  const rejectOpacity = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD, -SWIPE_THRESHOLD * 0.25, 0],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  const confirmOpacity = translateX.interpolate({
    inputRange: [0, SWIPE_THRESHOLD * 0.25, SWIPE_THRESHOLD],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {hasNext && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 10,
            left: 6,
            right: 6,
            bottom: -10,
            backgroundColor: colors.creamLight,
            borderWidth: 1.5,
            borderColor: colors.ink,
            borderRadius: radius.xl - 2,
            opacity: 0.5,
          }}
        />
      )}

      <Animated.View
        {...panResponder.panHandlers}
        style={{ flex: 1, opacity: enter, transform: [{ translateX }, { rotate }] }}
      >
        <BlockSurface
          shadow={shadow.md}
          radius={radius.xl - 2}
          style={{ backgroundColor: colors.creamLight, flex: 1 }}
        >
          <View style={{ padding: 20, flex: 1 }}>
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
              <Label style={{ fontSize: 11 }}>{p.domain}</Label>
            </View>

            <Display style={{ fontSize: 25, lineHeight: 32, marginBottom: 22 }}>{p.statement}</Display>

            <View style={{ marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Label style={{ fontSize: 11 }}>Confidence</Label>
                <Label style={{ fontSize: 11, color: colors.blue }}>{p.confidence}%</Label>
              </View>
              <AnimatedBar percent={p.confidence} track={colors.cream} delay={220} />
            </View>

            <View style={{ flex: 1 }} />

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ flex: 1 }}>
                <GhostButton label="Reject" onPress={() => flyOff(-1, onReject)} />
              </View>
              <View style={{ flex: 1 }}>
                <GhostButton label="Edit" onPress={() => {}} />
              </View>
              <View style={{ flex: 1.4 }}>
                <BlockSurface
                  onPress={() => flyOff(1, onConfirm)}
                  shadow={shadow.sm}
                  radius={radius.md}
                  style={{
                    backgroundColor: colors.green,
                    paddingVertical: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Label style={{ fontSize: 11, color: colors.ink, fontWeight: '700' }}>Confirm ✓</Label>
                </BlockSurface>
              </View>
            </View>
          </View>
        </BlockSurface>

        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 28,
            left: 24,
            borderWidth: 2,
            borderColor: colors.orange,
            borderRadius: radius.md,
            paddingVertical: 4,
            paddingHorizontal: 10,
            transform: [{ rotate: '-10deg' }],
            opacity: rejectOpacity,
          }}
        >
          <Label style={{ fontSize: 13, color: colors.orange, letterSpacing: 2 }}>Reject</Label>
        </Animated.View>
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 28,
            right: 24,
            borderWidth: 2,
            borderColor: colors.green,
            borderRadius: radius.md,
            paddingVertical: 4,
            paddingHorizontal: 10,
            transform: [{ rotate: '10deg' }],
            opacity: confirmOpacity,
          }}
        >
          <Label style={{ fontSize: 13, color: colors.green, letterSpacing: 2 }}>Confirm</Label>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
