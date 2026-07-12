import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type FacetProps = {
  size?: number;
  color?: string;
  opacity?: number;
  style?: ViewStyle;
};

/** The ◈ mark — Curato's signature diamond, resting state. Solid ink, hairline square rotated 45°. */
export function Facet({ size = 14, color = colors.ink, opacity = 1, style }: FacetProps) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          backgroundColor: color,
          opacity,
          borderRadius: 1,
          transform: [{ rotate: '45deg' }],
        },
        style,
      ]}
    />
  );
}

/** Gently pulsing facet — used on the Reading / Analyzing screens. */
export function PulsingFacet({ size = 26, color = colors.white, style }: FacetProps) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.82] });
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.4] });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '45deg' }, { scale }],
          opacity,
        },
        style,
      ]}
    />
  );
}

/** Facet that springs gently into place — used on Kept / Confirmed / Saved moments. */
export function SpringFacet({ size = 34, color = colors.ink, style }: FacetProps) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.spring(anim, {
      toValue: 1,
      friction: 6,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] });
  const opacity = anim.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 1] });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: 2,
          borderWidth: 1.5,
          borderColor: colors.ink,
          transform: [{ rotate: '45deg' }, { scale }],
          opacity,
        },
        style,
      ]}
    />
  );
}

/** Faint field-texture watermark treatment — two overlapping low-opacity facets. */
export function WatermarkFacet({ size = 24 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size }}>
      <Facet size={size} opacity={0.12} style={{ position: 'absolute' }} />
      <Facet size={size * 0.58} style={{ position: 'absolute', top: size * 0.21, left: size * 0.21 }} />
    </View>
  );
}

/** A ◈ particle that flies from an origin point up toward the taste model, then vanishes. */
export function FlyParticle({
  visible,
  color = colors.blue,
  tx = 120,
  ty = -420,
}: {
  visible: boolean;
  color?: string;
  tx?: number;
  ty?: number;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 900,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [visible, anim]);

  if (!visible) return null;

  const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, tx] });
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, ty] });
  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.4] });
  const opacity = anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 1, 0] });

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        right: 60,
        top: 6,
        width: 10,
        height: 10,
        borderRadius: 1,
        backgroundColor: color,
        opacity,
        transform: [{ translateX }, { translateY }, { rotate: '45deg' }, { scale }],
      }}
    />
  );
}
