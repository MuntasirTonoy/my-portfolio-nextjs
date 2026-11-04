// Shared animation settings so every landing section moves the same way.

export const EASE = [0.22, 1, 0.36, 1];

// Reveal once, when ~25% of the element is on screen.
export const VIEWPORT = { once: true, amount: 0.25 };

/** Spread onto a motion element: fades + rises into place when scrolled into view. */
export const fadeUp = (delay = 0, distance = 20) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.7, ease: EASE, delay },
});
