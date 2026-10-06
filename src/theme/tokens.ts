// Theme token placeholder. Six-export contract required by both the renderer
// and the A5 prompt (colors + colorsDark + colorsLight + spacing + radius +
// tokens). A5 replaces the values; the shape must stay stable across
// refinements or index.css's @theme block breaks.
export const colors = {
  primary: '#2D5BFF',
  surface: '#FFFFFF',
  ink: '#0B1220',
  dim: '#5B6478',
  line: '#E5E7EC',
};

export const colorsDark = {
  primary: '#5B8CFF',
  surface: '#0B1220',
  ink: '#F6F7FA',
  dim: '#9AA3B2',
  line: '#242B38',
};

export const colorsLight = colors;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };

export const radius = { sm: 6, md: 12, lg: 16, xl: 24 };

export const tokens = { colors, colorsDark, colorsLight, spacing, radius };
