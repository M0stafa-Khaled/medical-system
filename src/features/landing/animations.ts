import { type Variants } from "framer-motion";

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const viewportConfig = { once: true, amount: 0.2 };
