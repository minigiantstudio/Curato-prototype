import React from 'react';
import { Platform, View } from 'react-native';
import { colors } from '../theme/colors';

/**
 * On web, constrains the app to a 375×812 phone-shaped frame (matching the
 * design prototype's canvas) so it can be previewed in a browser. On native,
 * this is a no-op passthrough — the app already fills the device screen.
 */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View
      // @ts-expect-error minHeight: '100vh' is valid on web RN but not in the ViewStyle types
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a8a8a8',
        minHeight: '100vh',
      }}
    >
      <View
        style={{
          width: 375,
          height: 812,
          backgroundColor: colors.cream,
          borderWidth: 1.5,
          borderColor: colors.ink,
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        {children}
      </View>
    </View>
  );
}
