import { colors } from '../theme/colors';

export type Principle = {
  verb: 'NEVER' | 'PREFER' | 'ALWAYS';
  verbBg: string;
  domain: string;
  statement: string;
  confidence: number;
};

export const principles: Principle[] = [
  {
    verb: 'NEVER',
    domain: 'COLOR',
    statement: 'Digital gradients or drop shadows in any context',
    confidence: 87,
    verbBg: colors.orange,
  },
  {
    verb: 'PREFER',
    domain: 'COMPOSITION',
    statement: 'Centered subjects with generous negative space',
    confidence: 79,
    verbBg: colors.pink,
  },
  {
    verb: 'ALWAYS',
    domain: 'TYPOGRAPHY',
    statement: 'Humanist serifs set with wide tracking at display sizes',
    confidence: 92,
    verbBg: colors.green,
  },
];
