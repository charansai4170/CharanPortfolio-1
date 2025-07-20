import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoImage from "@assets/ChatGPT Image Jul 20, 2025, 01_27_37 AM_1753041763555.png";

interface LogoTransitionProps {
  isTransitioning: boolean;
  fromPage?: string;
  toPage?: string;
  onComplete?: () => void;
}

const LogoTransition = ({ isTransitioning, fromPage, toPage, onComplete }: LogoTransitionProps) => {
  const [animationPhase, setAnimationPhase] = useState<'shrink' | 'flip' | 'grow' | 'complete'>('shrink');

  useEffect(() => {
    if (!isTransitioning) return;

    const timeline = [
      { phase: 'shrink', duration: 400 },
      { phase: 'flip', duration: 600 },
      { phase: 'grow', duration: 400 },
      { phase: 'complete', duration: 200 }
    ];

    let totalTime = 0;
    timeline.forEach(({ phase, duration }) => {
      setTimeout(() => {
        setAnimationPhase(phase as any);
        if (phase === 'complete' && onComplete) {
          setTimeout(() => onComplete(), 100);
        }
      }, totalTime);
      totalTime += duration;
    });
  }, [isTransitioning, onComplete]);

  if (!isTransitioning) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Main Logo Transition */}
        <motion.div className="relative">
          {/* Logo Container */}
          <motion.div
            className="relative"
            animate={{
              scale: animationPhase === 'shrink' ? [1, 0.3] :
                     animationPhase === 'flip' ? [0.3, 0.3] :
                     animationPhase === 'grow' ? [0.3, 1.2, 1] : [1],
              rotateY: animationPhase === 'flip' ? [0, 180, 360] : [0],
              rotateZ: animationPhase === 'flip' ? [0, 90, 0] : [0],
            }}
            transition={{
              duration: animationPhase === 'shrink' ? 0.4 :
                       animationPhase === 'flip' ? 0.6 :
                       animationPhase === 'grow' ? 0.4 : 0.2,
              ease: "easeInOut"
            }}
          >
            <img 
              src={logoImage}
              alt="Charan Thota Logo"
              className="w-32 h-32 object-contain"
              style={{
                filter: `
                  drop-shadow(0 0 30px rgba(255, 215, 0, 0.8)) 
                  drop-shadow(0 0 60px rgba(192, 192, 192, 0.4))
                  drop-shadow(0 0 100px rgba(255, 215, 0, 0.2))
                `
              }}
            />

            {/* Rotating Ring Effect */}
            <motion.div
              className="absolute inset-0 border-2 border-yellow-400 rounded-full"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Secondary Ring */}
            <motion.div
              className="absolute inset-0 border border-white rounded-full"
              animate={{
                rotate: [360, 0],
                scale: [1.1, 1.3, 1.1],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>

          {/* Page Transition Text */}
          <AnimatePresence mode="wait">
            {animationPhase === 'flip' && (
              <motion.div
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-sm text-gray-400 mb-1"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {fromPage && `Leaving ${fromPage}`}
                  </motion.div>
                  <motion.div 
                    className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    {toPage && `Loading ${toPage}`}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glare Effects */}
          {animationPhase === 'grow' && (
            <>
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 150, opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)',
                  transform: 'skewX(-20deg)',
                  width: '60px',
                  height: '100%',
                  borderRadius: '50%'
                }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: -120, opacity: 0 }}
                animate={{ x: 120, opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.7) 50%, transparent 100%)',
                  transform: 'skewX(-15deg)',
                  width: '40px',
                  height: '100%',
                  borderRadius: '50%'
                }}
              />
            </>
          )}
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LogoTransition;