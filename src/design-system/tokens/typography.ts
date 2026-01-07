export const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans, 'Inter', system-ui, -apple-system, sans-serif)",
    mono: "var(--font-geist-mono, 'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace)",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.75rem",
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;
