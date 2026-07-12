import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors } from './colors';
import { fontFamily } from './fonts';

type Props = TextProps;

/** Editorial serif display type. Roman by default — pass italic for the one accent phrase per headline. */
export function Display({ style, italic, ...rest }: Props & { italic?: boolean }) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: italic ? fontFamily.displayItalic : fontFamily.display,
          fontStyle: italic ? 'italic' : 'normal',
          color: colors.ink,
          letterSpacing: -0.3,
        },
        style,
      ]}
    />
  );
}

/** The single italic accent phrase within a headline — `.serif-accent`. */
export function SerifAccent({ style, ...rest }: Props) {
  return <Display {...rest} italic style={style} />;
}

/** Mono label, uppercase, wide tracking, muted — `.label`. */
export function Label({ style, ...rest }: Props) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: fontFamily.mono,
          textTransform: 'uppercase',
          letterSpacing: 1.4,
          fontSize: 11,
          color: colors.inkSoft,
        },
        style,
      ]}
    />
  );
}

/** Mono label, uppercase, full ink — `.eyebrow`. */
export function Eyebrow({ style, ...rest }: Props) {
  return <Label {...rest} style={[{ color: colors.ink }, style]} />;
}

/** Raw mono, not necessarily uppercase — numbers, stats, IDs. */
export function Mono({ style, ...rest }: Props) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: fontFamily.mono, color: colors.ink }, style]}
    />
  );
}

/** Body copy — General Sans / Manrope fallback, medium weight. */
export function Body({ style, semiBold, ...rest }: Props & { semiBold?: boolean }) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: semiBold ? fontFamily.bodySemiBold : fontFamily.body,
          color: colors.ink,
          lineHeight: 21,
        },
        style,
      ]}
    />
  );
}
