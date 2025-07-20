import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WhimsicalLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const WhimsicalLoader = ({ isVisible, onComplete }: WhimsicalLoaderProps) => {
  const [currentShape, setCurrentShape] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const shapes = [
    { name: 'circle', path: 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10', color: '#3B82F6' },
    { name: 'square', path: 'M20,20 L80,20 L80,80 L20,80 Z', color: '#10B981' },
    { name: 'triangle', path: 'M50,15 L85,75 L15,75 Z', color: '#F59E0B' },
    { name: 'diamond', path: 'M50,15 L85,50 L50,85 L15,50 Z', color: '#EF4444' },
    { name: 'hexagon', path: 'M50,10 L75,30 L75,70 L50,90 L25,70 L25,30 Z', color: '#8B5CF6' },
    { name: 'star', path: 'M50,15 L60,35 L85,35 L67,52 L73,75 L50,62 L27,75 L33,52 L15,35 L40,35 Z', color: '#06B6D4' }
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

    // Shape morphing animation
    const shapeInterval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length);
    }, 800);

    // Loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(shapeInterval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(shapeInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible, onComplete]);

  const currentShapeData = shapes[currentShape];

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
            {/* Morphing geometric shape */}
            <div className="mb-8 relative">
              <motion.div
                className="w-32 h-32 mx-auto relative"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full drop-shadow-2xl"
                >
                  {/* Glowing background */}
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <motion.path
                    d={currentShapeData.path}
                    fill={currentShapeData.color}
                    filter="url(#glow)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0.8, 1.2, 1],
                      opacity: [0.7, 1, 0.8],
                    }}
                    key={currentShape}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                  />
                </svg>

                {/* Orbiting particles */}
                {[0, 120, 240].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{ 
                      background: `linear-gradient(45deg, ${currentShapeData.color}, white)`,
                      top: '50%',
                      left: '50%'
                    }}
                    animate={{
                      x: [
                        Math.cos((angle * Math.PI) / 180) * 60,
                        Math.cos(((angle + 360) * Math.PI) / 180) * 60
                      ],
                      y: [
                        Math.sin((angle * Math.PI) / 180) * 60,
                        Math.sin(((angle + 360) * Math.PI) / 180) * 60
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Loading text */}
            <motion.div
              className="mb-6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                Loading Portfolio
              </h2>
              <p className="text-blue-200 text-lg">
                Preparing something magical...
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 mx-auto">
              <div className="flex justify-between text-sm text-blue-200 mb-2">
                <span>Progress</span>
                <span>{Math.round(loadingProgress)}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
                  style={{ 
                    background: `linear-gradient(90deg, ${currentShapeData.color}, #8B5CF6)` 
                  }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

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