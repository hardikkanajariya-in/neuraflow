export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  page: 0.5,
} as const;

export const ease = {
  default: [0.4, 0, 0.2, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;

export const slideDown = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
} as const;

export const slideUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
} as const;

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
} as const;

export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;
