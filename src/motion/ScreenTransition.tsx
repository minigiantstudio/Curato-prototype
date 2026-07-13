import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { motion } from './tokens';

export function ScreenTransition({
  screenKey,
  children,
}: {
  screenKey: string;
  children: React.ReactNode;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: motion.duration.reveal,
      easing: motion.easing,
      useNativeDriver: true,
    }).start();
  }, [screenKey, anim]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [6, 0] });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: anim,
        transform: [{ translateY }],
      }}
    >
      {children}
    </Animated.View>
  );
}
