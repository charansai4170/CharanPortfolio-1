import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WhimsicalLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const WhimsicalLoader = ({ isVisible, onComplete }: WhimsicalLoaderProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  const shapes = [
    { 
      name: 'square', 
      borderRadius: [0, 50, 0], 
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
      delay: 0
    },
    { 
      name: 'circle', 
      borderRadius: [50, 0, 50], 
      colors: ['#96CEB4', '#FFEAA7', '#DDA0DD'],
      delay: 0.6
    },
    { 
      name: 'diamond', 
      borderRadius: [25, 50, 25], 
      colors: ['#74B9FF', '#FD79A8', '#FDCB6E'],
      delay: 1.2
    }
  ];

  const floatingElements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }));

  useEffect(() => {
    if (!isVisible) return;

    // Auto-complete after 3 seconds
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible, onComplete]);



  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {floatingElements.map((element) => (
              <motion.div
                key={element.id}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: element.size,
                  height: element.size,
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: element.duration,
                  delay: element.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Main loader content */}
          <div className="relative text-center">
            {/* Three morphing shapes */}
            <div className="mb-8 relative flex justify-center items-center space-x-8">
              {shapes.map((shape, index) => (
                <motion.div
                  key={shape.name}
                  className="w-20 h-20"
                  style={{
                    background: `linear-gradient(135deg, ${shape.colors[0]}, ${shape.colors[1]}, ${shape.colors[2]})`,
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))'
                  }}
                  animate={{
                    borderRadius: shape.borderRadius.map(r => `${r}%`),
                    scale: [1, 1.3, 0.8, 1],
                    rotate: [0, 180, 360],
                    background: [
                      `linear-gradient(135deg, ${shape.colors[0]}, ${shape.colors[1]}, ${shape.colors[2]})`,
                      `linear-gradient(135deg, ${shape.colors[1]}, ${shape.colors[2]}, ${shape.colors[0]})`,
                      `linear-gradient(135deg, ${shape.colors[2]}, ${shape.colors[0]}, ${shape.colors[1]})`,
                      `linear-gradient(135deg, ${shape.colors[0]}, ${shape.colors[1]}, ${shape.colors[2]})`
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: shape.delay,
                    times: [0, 0.33, 0.66, 1]
                  }}
                />
              ))}
            </div>

            {/* Loading text with wave effect */}
            <motion.div
              className="mb-6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                {"Loading Portfolio".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    animate={{ 
                      y: [0, -10, 0],
                      color: ['#ffffff', '#FF6B6B', '#4ECDC4', '#ffffff']
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h2>
              <p className="text-blue-200 text-lg">
                Morphing into something amazing...
              </p>
            </motion.div>

            {/* Loading dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          {[
            { position: 'top-4 left-4', rotation: 0 },
            { position: 'top-4 right-4', rotation: 90 },
            { position: 'bottom-4 left-4', rotation: 270 },
            { position: 'bottom-4 right-4', rotation: 180 }
          ].map((corner, i) => (
            <motion.div
              key={i}
              className={`absolute ${corner.position}`}
              animate={{ 
                rotate: corner.rotation + 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, delay: i * 0.5 }
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                  fill="white"
                  opacity="0.3"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhimsicalLoader;