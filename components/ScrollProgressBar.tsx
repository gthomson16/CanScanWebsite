"use client";

import { motion, useScroll } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="scroll-progress-container">
      <motion.div 
        className="scroll-progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}