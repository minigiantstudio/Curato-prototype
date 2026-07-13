import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { motion } from '../motion/tokens';

/**
 * A hairline-bordered meter whose fill animates from 0 to `percent` on mount
 * (and re-animates whenever `percent` changes). Used for the Review progress
 * bar and confidence bars so values arrive with a confident sweep rather than
 * appearing static. Width can't use the native driver, so this one animates on
 * the JS thread — fine for a single short tween.
 */
export function AnimatedBar({
  percent,
  height = 4,
  fill = colors.blue,
  track = colors.creamLight,
  delay = 0,
  style,
}: {
  percent: number;
  height?: number;
  fill?: string;
  track?: string;
  delay?: number;
  style?: ViewStyle;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    const id = setTimeout(() => {
      Animated.timing(anim, {
        toValue: percent,
        duration: motion.duration.wipe,
        easing: motion.easing,
        useNativeDriver: false,
      }).start();
    }, delay);
    return () => clearTimeout(id);
  }, [anim, percent, delay]);

  const width = anim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={[
        {
          height,
          backgroundColor: track,
          borderWidth: 1,
          borderColor: colors.ink,
          borderRadius: 2,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View style={{ width, height: '100%', backgroundColor: fill }} />
    </View>
  );
}
