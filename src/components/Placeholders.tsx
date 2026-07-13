import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Display } from '../theme/Type';
import { colors } from '../theme/colors';
import { fontFamily } from '../theme/fonts';

type Props = { style?: StyleProp<ViewStyle> };

/** Subtle top-light → bottom-shade overlay that gives the flat gradients photographic depth. */
function Depth() {
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.10)', 'rgba(0,0,0,0.04)', 'rgba(0,0,0,0.22)']}
      locations={[0, 0.5, 1]}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      pointerEvents="none"
    />
  );
}

/**
 * Sample capture — a restrained Scandinavian café logotype. Muted ochre/brown
 * earth tones, a quiet serif wordmark framed by mono microcopy: the kind of
 * confident, understated identity the taste model keeps rewarding.
 */
export function FikaImage({ style }: Props) {
  return (
    <LinearGradient
      colors={['#c49a67', '#9a7048', '#6f4f33']}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={[{ alignItems: 'center', justifyContent: 'center', padding: 20 }, style]}
    >
      <Depth />
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 9,
            letterSpacing: 3,
            color: 'rgba(255,255,255,0.72)',
            marginBottom: 12,
          }}
        >
          KAFFEBAR · OSLO
        </Text>
        <View style={{ height: 1, width: 26, backgroundColor: 'rgba(255,255,255,0.5)', marginBottom: 10 }} />
        <Display style={{ fontSize: 46, color: '#fbf3e8', letterSpacing: 0.5 }}>Fika</Display>
        <View style={{ height: 1, width: 26, backgroundColor: 'rgba(255,255,255,0.5)', marginTop: 10, marginBottom: 12 }} />
        <Text
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 8.5,
            letterSpacing: 2.5,
            color: 'rgba(255,255,255,0.72)',
          }}
        >
          KAFFE — BAGERI — RO
        </Text>
      </View>
    </LinearGradient>
  );
}

/**
 * A loud, slightly off-brand café Instagram post — saturated green, a heavy
 * headline with a hard drop shadow, and a shouting discount badge. Deliberately
 * fights the café's restrained identity so the Brand-check verdict ("saturated
 * green… text drop shadow…") reads at a glance.
 */
export function SummerBlendImage({ style, compact }: Props & { compact?: boolean }) {
  const big = !compact;
  return (
    <LinearGradient
      colors={['#8ed06a', '#57a53c', '#3c8a2c']}
      start={{ x: 0.15, y: 0 }}
      end={{ x: 0.85, y: 1 }}
      style={[{ alignItems: 'center', justifyContent: 'center', padding: 18 }, style]}
    >
      <Depth />
      {/* shouting badge */}
      <View
        style={{
          position: 'absolute',
          top: big ? 18 : 10,
          right: big ? 18 : 10,
          backgroundColor: '#f2b30a',
          borderWidth: 2,
          borderColor: '#1c1b1a',
          borderRadius: 3,
          paddingVertical: big ? 5 : 3,
          paddingHorizontal: big ? 9 : 6,
          transform: [{ rotate: '6deg' }],
        }}
      >
        <Text style={{ fontFamily: fontFamily.bodySemiBold, fontWeight: '800', fontSize: big ? 13 : 9, color: '#1c1b1a', letterSpacing: 0.3 }}>
          50% OFF
        </Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: fontFamily.bodySemiBold,
            fontWeight: '800',
            fontSize: big ? 34 : 20,
            lineHeight: big ? 34 : 20,
            color: '#ffffff',
            letterSpacing: 0.5,
            textAlign: 'center',
            // the off-brand tell: a hard digital drop shadow
            textShadowColor: 'rgba(0,0,0,0.45)',
            textShadowOffset: { width: 0, height: big ? 4 : 2 },
            textShadowRadius: 0.5,
          }}
        >
          SUMMER{'\n'}BLEND
        </Text>
        {big && (
          <Text
            style={{
              fontFamily: fontFamily.mono,
              fontSize: 11,
              letterSpacing: 2,
              color: '#ffffff',
              marginTop: 12,
              textShadowColor: 'rgba(0,0,0,0.35)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 0.5,
            }}
          >
            NOW POURING
          </Text>
        )}
      </View>
    </LinearGradient>
  );
}

/**
 * Compare — Option A: the louder direction. Saturated warm ground with
 * high-contrast black display type; reads busy against the muted-palette
 * principle (which is why B wins).
 */
export function OptionAGradient({ style }: Props) {
  return (
    <LinearGradient
      colors={['#ef7a3d', '#d43f1c']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ alignItems: 'center', justifyContent: 'center', padding: 12 }, style]}
    >
      <Depth />
      <Display style={{ fontSize: 26, color: '#141210', textAlign: 'center', lineHeight: 26 }}>
        Bold{'\n'}Move
      </Display>
      <View style={{ height: 3, width: 34, backgroundColor: '#141210', marginTop: 8 }} />
    </LinearGradient>
  );
}

/**
 * Compare — Option B: the restrained direction. Tonal violet-grey, calm serif,
 * generous space; stays inside the muted range the taste model prefers.
 */
export function OptionBGradient({ style }: Props) {
  return (
    <LinearGradient
      colors={['#726e88', '#4b4864']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ alignItems: 'center', justifyContent: 'center', padding: 14 }, style]}
    >
      <Depth />
      <Text
        style={{
          fontFamily: fontFamily.mono,
          fontSize: 8,
          letterSpacing: 2.5,
          color: 'rgba(255,255,255,0.7)',
          marginBottom: 8,
        }}
      >
        A QUIETER WAY
      </Text>
      <Display italic style={{ fontSize: 22, color: '#f2f0f5', textAlign: 'center' }}>
        Restraint
      </Display>
    </LinearGradient>
  );
}
