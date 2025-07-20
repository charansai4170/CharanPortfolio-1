import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface GradientColor {
  r: number;
  g: number;
  b: number;
}

interface InteractiveGradientBackgroundProps {
  children: React.ReactNode;
  intensity?: number;
  speed?: number;
}

const InteractiveGradientBackground = ({ 
  children, 
  intensity = 0.3, 
  speed = 0.5 
}: InteractiveGradientBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gradientColors, setGradientColors] = useState<GradientColor[]>([
    { r: 37, g: 99, b: 235 },    // Primary blue
    { r: 30, g: 41, b: 59 },     // Secondary dark
    { r: 14, g: 165, b: 233 },   // Accent cyan
    { r: 139, g: 92, b: 246 }    // Purple accent
  ]);
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0);

  // Color palette presets for different interactions
  const colorPalettes = {
    default: [
      { r: 37, g: 99, b: 235 },
      { r: 30, g: 41, b: 59 },
      { r: 14, g: 165, b: 233 },
      { r: 139, g: 92, b: 246 }
    ],
    warm: [
      { r: 245, g: 158, b: 11 },
      { r: 239, g: 68, b: 68 },
      { r: 251, g: 146, b: 60 },
      { r: 236, g: 72, b: 153 }
    ],
    cool: [
      { r: 6, g: 182, b: 212 },
      { r: 59, g: 130, b: 246 },
      { r: 16, g: 185, b: 129 },
      { r: 139, g: 92, b: 246 }
    ],
    sunset: [
      { r: 251, g: 113, b: 133 },
      { r: 252, g: 176, b: 64 },
      { r: 236, g: 72, b: 153 },
      { r: 168, g: 85, b: 247 }
    ],
    ocean: [
      { r: 6, g: 182, b: 212 },
      { r: 14, g: 165, b: 233 },
      { r: 59, g: 130, b: 246 },
      { r: 99, g: 102, b: 241 }
    ]
  };

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setMousePosition({ x, y });
  }, []);

  // Handle scroll
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  // Update time for continuous animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + speed);
    }, 50);

    return () => clearInterval(interval);
  }, [speed]);

  // Add event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  // Update gradient colors based on interactions
  useEffect(() => {
    const updateColors = () => {
      // Determine palette based on mouse position and scroll
      let palette = colorPalettes.default;
      
      if (mousePosition.x < 0.2) {
        palette = colorPalettes.cool;
      } else if (mousePosition.x > 0.8) {
        palette = colorPalettes.warm;
      } else if (mousePosition.y < 0.2) {
        palette = colorPalettes.sunset;
      } else if (mousePosition.y > 0.8) {
        palette = colorPalettes.ocean;
      }

      // Smooth transition between colors
      setGradientColors(prev => 
        prev.map((color, index) => {
          const target = palette[index];
          const factor = 0.1; // Smooth transition factor
          
          return {
            r: Math.round(color.r + (target.r - color.r) * factor),
            g: Math.round(color.g + (target.g - color.g) * factor),
            b: Math.round(color.b + (target.b - color.b) * factor)
          };
        })
      );
    };

    updateColors();
  }, [mousePosition.x, mousePosition.y, scrollY]);

  // Create dynamic gradient based on interactions
  const createGradient = () => {
    const mouseInfluence = intensity;
    const timeInfluence = Math.sin(time * 0.01) * 0.1;
    const scrollInfluence = (scrollY / window.innerHeight) * 0.2;

    // Calculate gradient positions based on mouse and scroll
    const positions = [
      {
        x: Math.max(0, Math.min(100, (mousePosition.x * 100) + timeInfluence * 50)),
        y: Math.max(0, Math.min(100, (mousePosition.y * 100) + scrollInfluence * 50))
      },
      {
        x: Math.max(0, Math.min(100, 100 - (mousePosition.x * 100) + timeInfluence * 30)),
        y: Math.max(0, Math.min(100, 100 - (mousePosition.y * 100) + scrollInfluence * 30))
      },
      {
        x: Math.max(0, Math.min(100, 50 + (mousePosition.x - 0.5) * 80 + timeInfluence * 40)),
        y: Math.max(0, Math.min(100, 50 + (mousePosition.y - 0.5) * 80 + scrollInfluence * 40))
      },
      {
        x: Math.max(0, Math.min(100, 50 - (mousePosition.x - 0.5) * 60 + timeInfluence * 20)),
        y: Math.max(0, Math.min(100, 50 - (mousePosition.y - 0.5) * 60 + scrollInfluence * 20))
      }
    ];

    // Create radial gradients at each position
    const gradients = positions.map((pos, index) => {
      const color = gradientColors[index];
      const alpha = mouseInfluence + 0.1 + Math.sin(time * 0.02 + index) * 0.05;
      return `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(${color.r}, ${color.g}, ${color.b}, ${alpha}) 0%, transparent 70%)`;
    });

    return gradients.join(', ');
  };

  // Floating particles that respond to mouse
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    speed: Math.random() * 0.5 + 0.2
  }));

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Main interactive gradient background */}
      <motion.div
        className="fixed inset-0 z-0 transition-opacity duration-1000"
        style={{
          background: createGradient(),
          opacity: 0.8
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/10"
            style={{
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              x: [
                particle.initialX + '%',
                (particle.initialX + mousePosition.x * 20) + '%',
                particle.initialX + '%'
              ],
              y: [
                particle.initialY + '%',
                (particle.initialY + mousePosition.y * 20) + '%',
                particle.initialY + '%'
              ],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 6 / particle.speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.id * 0.5
            }}
          />
        ))}
      </div>

      {/* Mesh gradient overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Interactive indicator (subtle) */}
      <motion.div
        className="fixed bottom-4 right-4 z-10 text-white/30 text-xs font-medium pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        Move your mouse to explore
      </motion.div>
    </div>
  );
};

export default InteractiveGradientBackground;