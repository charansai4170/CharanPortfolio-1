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
    { r: 59, g: 130, b: 246 },   // Blue
    { r: 14, g: 165, b: 233 },   // Sky blue
    { r: 6, g: 182, b: 212 },    // Cyan
    { r: 16, g: 185, b: 129 }    // Emerald
  ]);
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0);

  // Cool color palette presets for different interactions
  const colorPalettes = {
    default: [
      { r: 59, g: 130, b: 246 },   // Blue
      { r: 14, g: 165, b: 233 },   // Sky blue
      { r: 6, g: 182, b: 212 },    // Cyan
      { r: 16, g: 185, b: 129 }    // Emerald
    ],
    topLeft: [
      { r: 79, g: 70, b: 229 },    // Indigo
      { r: 99, g: 102, b: 241 },   // Violet
      { r: 139, g: 92, b: 246 },   // Purple
      { r: 59, g: 130, b: 246 }    // Blue
    ],
    topRight: [
      { r: 6, g: 182, b: 212 },    // Cyan
      { r: 14, g: 165, b: 233 },   // Sky
      { r: 59, g: 130, b: 246 },   // Blue
      { r: 16, g: 185, b: 129 }    // Emerald
    ],
    bottomLeft: [
      { r: 16, g: 185, b: 129 },   // Emerald
      { r: 5, g: 150, b: 105 },    // Teal
      { r: 6, g: 182, b: 212 },    // Cyan
      { r: 14, g: 165, b: 233 }    // Sky
    ],
    bottomRight: [
      { r: 139, g: 92, b: 246 },   // Purple
      { r: 59, g: 130, b: 246 },   // Blue
      { r: 14, g: 165, b: 233 },   // Sky
      { r: 6, g: 182, b: 212 }     // Cyan
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
      // Determine palette based on mouse position quadrants
      let palette = colorPalettes.default;
      
      if (mousePosition.x < 0.5 && mousePosition.y < 0.5) {
        palette = colorPalettes.topLeft;
      } else if (mousePosition.x >= 0.5 && mousePosition.y < 0.5) {
        palette = colorPalettes.topRight;
      } else if (mousePosition.x < 0.5 && mousePosition.y >= 0.5) {
        palette = colorPalettes.bottomLeft;
      } else if (mousePosition.x >= 0.5 && mousePosition.y >= 0.5) {
        palette = colorPalettes.bottomRight;
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
      {/* Animated base gradient */}
      <motion.div
        className="fixed inset-0 z-[-1]"
        animate={{
          background: [
            'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 25%, #06b6d4 50%, #10b981 100%)',
            'linear-gradient(225deg, #0ea5e9 0%, #06b6d4 25%, #10b981 50%, #3b82f6 100%)',
            'linear-gradient(315deg, #06b6d4 0%, #10b981 25%, #3b82f6 50%, #0ea5e9 100%)',
            'linear-gradient(45deg, #10b981 0%, #3b82f6 25%, #0ea5e9 50%, #06b6d4 100%)',
            'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 25%, #06b6d4 50%, #10b981 100%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ opacity: 0.6 }}
      />

      {/* Mouse-following radial gradient */}
      <motion.div
        className="fixed inset-0 z-[-1] pointer-events-none"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.8) 0%, rgba(14, 165, 233, 0.4) 30%, transparent 70%)`,
          opacity: 0.8
        }}
        animate={{
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Interactive gradient overlay */}
      <motion.div
        className="fixed inset-0 z-[-1] transition-all duration-500"
        style={{
          background: createGradient(),
          opacity: 0.3
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
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
        className="fixed inset-0 z-[-1] opacity-10"
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