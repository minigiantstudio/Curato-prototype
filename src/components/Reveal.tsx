import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { motion } from '../motion/tokens';

/**
 * Fades + drifts its children up into place on mount. Pass an incrementing
 * `index` (and optional `step`) to stagger a group — row 0 enters first, row 1
 * a beat later, etc. Built on the core Animated API (native-driven), so it runs
 * in Expo Go with no worklets.
 */
export function Reveal({
  children,
  index = 0,
  step = 70,
  distance = 10,
  style,
}: {
  children: React.ReactNode;
  index?: number;
  step?: number;
  distance?: number;
  style?: ViewStyle;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const id = setTimeout(() => {
      Animated.timing(anim, {
        toValue: 1,
        duration: motion.duration.reveal,
        easing: motion.easing,
        useNativeDriver: true,
      }).start();
    }, index * step);
    return () => clearTimeout(id);
  }, [anim, index, step]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] });

  return (
    <Animated.View style={[{ opacity: anim, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}
