import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
// We use the dynamic import to prevent issues with SSR/three globals,
// but for standard Vite we can import directly or use script tags.
import RINGS from 'vanta/dist/vanta.rings.min';

const AnimatedBackground = ({ theme }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(RINGS({
        el: myRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: theme === 'dark' ? 0x0f172a : 0xf1f5f9,
        color: theme === 'dark' ? 0x3b82f6 : 0x8b5cf6
      }));
    } else {
      vantaEffect.setOptions({
        backgroundColor: theme === 'dark' ? 0x0f172a : 0xf1f5f9,
        color: theme === 'dark' ? 0x3b82f6 : 0x8b5cf6
      });
    }
  }, [vantaEffect, theme]);

  useEffect(() => {
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={myRef} className="fixed top-0 left-0 w-full h-full -z-10 transition-colors duration-700" />;
};

export default AnimatedBackground;
