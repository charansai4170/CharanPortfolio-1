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
    { r: 219, g: 234, b: 254 },  // Light blue
    { r: 239, g: 246, b: 255 },  // Very light blue
    { r: 225, g: 239, b: 254 },  // Light sky
    { r: 243, g: 244, b: 246 }   // Light gray
  ]);
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0);

  // Light color palette presets for different interactions
  const colorPalettes = {
    default: [
      { r: 219, g: 234, b: 254 },  // Light blue
      { r: 239, g: 246, b: 255 },  // Very light blue
      { r: 225, g: 239, b: 254 },  // Light sky
      { r: 243, g: 244, b: 246 }   // Light gray
    ],
    warm: [
      { r: 254, g: 249, b: 195 },  // Light yellow
      { r: 254, g: 226, b: 226 },  // Light pink
      { r: 254, g: 235, b: 200 },  // Light peach
      { r: 252, g: 231, b: 243 }   // Light rose
    ],
    cool: [
      { r: 240, g: 253, b: 250 },  // Light mint
      { r: 219, g: 234, b: 254 },  // Light blue
      { r: 236, g: 253, b: 245 },  // Light emerald
      { r: 245, g: 243, b: 255 }   // Light purple
    ],
    sunset: [
      { r: 254, g: 242, b: 242 },  // Light red
      { r: 255, g: 251, b: 235 },  // Light amber
      { r: 252, g: 231, b: 243 },  // Light pink
      { r: 250, g: 245, b: 255 }   // Light violet
    ],
    ocean: [
      { r: 240, g: 253, b: 250 },  // Light teal
      { r: 225, g: 239, b: 254 },  // Light blue
      { r: 219, g: 234, b: 254 },  // Light sky
      { r: 233, g: 213, b: 255 }   // Light indigo
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
          opacity: 0.4
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3]
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
            className="absolute rounded-full bg-white/30"
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

      {/* Mesh gradient overlay - lighter */}
      <div 
        className="fixed inset-0 z-0 opacity-10"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(219, 234, 254, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(254, 226, 226, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(240, 253, 250, 0.2) 0%, transparent 50%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Interactive indicator (subtle) */}
      <motion.div
        className="fixed bottom-4 right-4 z-10 text-gray-400 text-xs font-medium pointer-events-none"
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