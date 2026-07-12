import React, { useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius as radiusTokens } from '../theme/colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  /** Hard-edge block shadow offset in px. 0 disables the shadow entirely. */
  shadow?: number;
  shadowColor?: string;
  radius?: number;
  borderColor?: string;
  borderWidth?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Curato's signature flat surface: 1.5px ink border + hard-edge block shadow
 * (`5px 5px 0 0 #000`, no blur). On press, the surface translates into its
 * shadow so the shadow visually collapses — mirrors the `.press` utility.
 *
 * The shadow rectangle is sized from the front surface's measured layout
 * rather than negative absolute offsets, which Yoga/react-native-web size
 * inconsistently.
 */
export function BlockSurface({
  children,
  onPress,
  disabled,
  shadow = 0,
  shadowColor = colors.ink,
  radius = radiusTokens.lg,
  borderColor = colors.ink,
  borderWidth = 1.5,
  style,
}: Props) {
  const anim = useRef(new Animated.Value(0)).current;
  const [size, setSize] = useState({ width: 0, height: 0 });

  const pressIn = () => {
    if (!shadow) return;
    Animated.timing(anim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
  };
  const pressOut = () => {
    if (!shadow) return;
    Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  const translate = anim.interpolate({ inputRange: [0, 1], outputRange: [0, shadow] });

  const frontStyle = [
    {
      borderWidth,
      borderColor,
      borderRadius: radius,
      transform: [{ translateX: translate }, { translateY: translate }],
    },
    style,
  ];

  // Sizing props (flex, width, height, alignSelf, margins) must also live on
  // the outer wrapper — it's the element that actually participates in the
  // parent's flex layout. The front surface only receives them for intrinsic
  // (content-based) sizing; Yoga won't stretch a flex-item's *child* just
  // because the child's own style says `flex: 1`.
  const flat = StyleSheet.flatten(style) ?? {};
  const {
    flex: sFlex,
    flexGrow,
    flexShrink,
    flexBasis,
    width: sWidth,
    height: sHeight,
    alignSelf,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
  } = flat as ViewStyle;
  const outerSizingStyle: ViewStyle = {
    flex: sFlex,
    flexGrow,
    flexShrink,
    flexBasis,
    width: sWidth,
    height: sHeight,
    alignSelf,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
  };

  return (
    <Animated.View style={[{ position: 'relative' }, outerSizingStyle]}>
      {shadow > 0 && size.width > 0 && (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: shadow,
            left: shadow,
            width: size.width,
            height: size.height,
            backgroundColor: shadowColor,
            borderRadius: radius,
          }}
        />
      )}
      {onPress ? (
        <AnimatedPressable
          onPress={onPress}
          onPressIn={pressIn}
          onPressOut={pressOut}
          disabled={disabled}
          onLayout={onLayout}
          style={frontStyle}
        >
          {children}
        </AnimatedPressable>
      ) : (
        <Animated.View onLayout={onLayout} style={frontStyle}>
          {children}
        </Animated.View>
      )}
    </Animated.View>
  );
}
