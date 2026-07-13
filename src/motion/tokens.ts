import { Easing } from 'react-native';

export const motion = {
  easing: Easing.bezier(0.2, 0, 0, 1),
  duration: {
    fast: 200,
    reveal: 360,
    wipe: 500,
  },
  spring: {
    snappy: { stiffness: 260, damping: 22, mass: 0.9 },
    settle: { stiffness: 200, damping: 20, mass: 1 },
  },
} as const;
