// Curato brand tokens — see project/uploads/curato-handoff/DESIGN_SYSTEM.md
export const colors = {
  ink: '#000000',
  cream: '#d1d1d1',
  creamLight: '#e8e8e8',
  blue: '#3346cf',
  green: '#d6f2ae',
  orange: '#ea6f55',
  pink: '#d6a4d7',
  // Darkened from #4f5142 for stronger contrast on cream surfaces — secondary
  // text should still read as clearly legible, never gray-on-gray.
  inkSoft: '#33332e',
  rule: 'rgba(0,0,0,0.16)',
  white: '#ffffff',
};

export const radius = {
  sm: 2,
  md: 4,
  lg: 6,
  xl: 10,
};

export const shadow = {
  sm: 3,
  md: 5,
  lg: 8,
};

export const easing = {
  // cubic-bezier(0.2, 0, 0, 1) — closest RN Easing.bezier equivalent
  standard: [0.2, 0, 0, 1] as const,
};
