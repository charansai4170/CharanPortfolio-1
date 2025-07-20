import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SimpleGradientBackgroundProps {
  children: React.ReactNode;
}

const SimpleGradientBackground = ({ children }: SimpleGradientBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [colors, setColors] = useState({
    primary: { r: 59, g: 130, b: 246 },    // Blue
    secondary: { r: 147, g: 51, b: 234 },   // Purple
    accent: { r: 236, g: 72, b: 153 }       // Pink
  });

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setMousePosition({ x, y });
    
    // Change colors based on mouse position
    const baseBlue = { r: 59, g: 130, b: 246 };
    const basePurple = { r: 147, g: 51, b: 234 };
    const basePink = { r: 236, g: 72, b: 153 };
    
    // Interpolate colors based on position
    const primary = {
      r: Math.round(baseBlue.r + (basePurple.r - baseBlue.r) * x),
      g: Math.round(baseBlue.g + (basePurple.g - baseBlue.g) * x),
      b: Math.round(baseBlue.b + (basePurple.b - baseBlue.b) * x)
    };
    
    const secondary = {
      r: Math.round(basePurple.r + (basePink.r - basePurple.r) * y),
      g: Math.round(basePurple.g + (basePink.g - basePurple.g) * y),
      b: Math.round(basePurple.b + (basePink.b - basePurple.b) * y)
    };
    
    setColors({ primary, secondary, accent: basePink });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const gradientStyle = {
    background: `linear-gradient(135deg, 
      rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, 0.1) 0%, 
      rgba(${colors.secondary.r}, ${colors.secondary.g}, ${colors.secondary.b}, 0.1) 50%, 
      rgba(${colors.accent.r}, ${colors.accent.g}, ${colors.accent.b}, 0.1) 100%)`,
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Dynamic gradient overlay */}
      <motion.div
        className="fixed inset-0 z-[-1]"
        style={gradientStyle}
        animate={{
          background: [
            `linear-gradient(135deg, rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, 0.1) 0%, rgba(${colors.secondary.r}, ${colors.secondary.g}, ${colors.secondary.b}, 0.1) 50%, rgba(${colors.accent.r}, ${colors.accent.g}, ${colors.accent.b}, 0.1) 100%)`,
            `linear-gradient(225deg, rgba(${colors.secondary.r}, ${colors.secondary.g}, ${colors.secondary.b}, 0.1) 0%, rgba(${colors.accent.r}, ${colors.accent.g}, ${colors.accent.b}, 0.1) 50%, rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, 0.1) 100%)`,
            `linear-gradient(315deg, rgba(${colors.accent.r}, ${colors.accent.g}, ${colors.accent.b}, 0.1) 0%, rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, 0.1) 50%, rgba(${colors.secondary.r}, ${colors.secondary.g}, ${colors.secondary.b}, 0.1) 100%)`,
            `linear-gradient(135deg, rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, 0.1) 0%, rgba(${colors.secondary.r}, ${colors.secondary.g}, ${colors.secondary.b}, 0.1) 50%, rgba(${colors.accent.r}, ${colors.accent.g}, ${colors.accent.b}, 0.1) 100%)`
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SimpleGradientBackground;