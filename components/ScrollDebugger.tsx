"use client";

import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollDebugger() {
  const { scrollYProgress } = useScroll();
  const [scrollPercent, setScrollPercent] = useState(0);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      setScrollPercent(Math.round(value * 100));
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress-container">
        <motion.div 
          className="scroll-progress-bar"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
      
      {/* Scroll percentage indicator */}
      <div className="scroll-indicator">
        <strong>Scroll: {scrollPercent}%</strong>
        <div 
          style={{ 
            width: '100%', 
            height: '10px', 
            background: 'white',
            marginTop: '4px',
            borderRadius: '5px',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{ 
              width: `${scrollPercent}%`, 
              height: '100%', 
              background: 'red' 
            }}
          />
        </div>
      </div>
    </>
  );
}