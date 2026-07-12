import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, View } from 'react-native';
import { colors, radius } from '../theme/colors';

export function BottomSheet({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 320,
        easing: Easing.bezier(0.2, 0, 0, 1),
        useNativeDriver: true,
      }).start();
    }
  }, [visible, anim]);

  if (!visible) return null;

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [400, 0] });
  const backdropOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}>
      <Animated.View style={{ opacity: backdropOpacity, flex: 1 }}>
        <Pressable
          onPress={onClose}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.creamLight,
          borderTopWidth: 1.5,
          borderTopColor: colors.ink,
          borderTopLeftRadius: radius.xl + 2,
          borderTopRightRadius: radius.xl + 2,
          paddingTop: 10,
          paddingHorizontal: 22,
          paddingBottom: 30,
          transform: [{ translateY }],
        }}
      >
        <View
          style={{
            width: 36,
            height: 4,
            backgroundColor: colors.ink,
            opacity: 0.3,
            borderRadius: 2,
            alignSelf: 'center',
            marginBottom: 20,
          }}
        />
        {children}
      </Animated.View>
    </View>
  );
}
