import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { OptionAGradient, OptionBGradient } from '../../components/Placeholders';
import { Label } from '../../theme/Type';
import { colors } from '../../theme/colors';

function PulsingScale({ children }: { children: React.ReactNode }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);
  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.82] });
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.4] });
  return <Animated.View style={{ transform: [{ scale }], opacity }}>{children}</Animated.View>;
}

export function CompareComparingScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row' }}>
        <OptionAGradient style={{ flex: 1 }} />
        <OptionBGradient style={{ flex: 1 }} />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.68)',
        }}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 22 }}>
        <PulsingScale>
          <Label style={{ fontSize: 26, color: colors.white, textTransform: 'none', letterSpacing: 0 }}>⚖</Label>
        </PulsingScale>
        <Label style={{ fontSize: 13, color: colors.white, letterSpacing: 2.2 }}>
          Weighing both against your taste…
        </Label>
      </View>
    </View>
  );
}
