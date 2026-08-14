import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants: Variants = {
  // Avoid opacity: 0 — axe treats opacity-0 ancestors as hiding headings
  // (page-has-heading-one false positive during enter animations).
  initial: {
    opacity: 1,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1], // premium ease-out cubic
    },
  },
  exit: {
    opacity: 1,
    y: -8,
    transition: {
      duration: 0.25,
      ease: [0.7, 0, 0.84, 0], // ease-in
    },
  },
};

/**
 * PageTransition wrapper to inject clean fade-and-slide transitions on load.
 */
export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col flex-1"
    >
      {children}
    </motion.div>
  );
};
