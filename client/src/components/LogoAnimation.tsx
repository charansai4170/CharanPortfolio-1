import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@assets/ChatGPT Image Jul 20, 2025, 01_27_37 AM_1753041763555.png";

interface LogoAnimationProps {
  onComplete?: () => void;
}

const LogoAnimation = ({ onComplete }: LogoAnimationProps) => {
  const [animationPhase, setAnimationPhase] = useState<'loading' | 'logo' | 'glare' | 'particles' | 'complete'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeline = [
      { phase: 'logo', duration: 1200 },
      { phase: 'glare', duration: 1000 },
      { phase: 'particles', duration: 800 },
      { phase: 'complete', duration: 600 }
    ];

    let totalTime = 0;
    timeline.forEach(({ phase, duration }, index) => {
      setTimeout(() => {
        setAnimationPhase(phase as any);
        if (phase === 'complete' && onComplete) {
          onComplete();
        }
      }, totalTime);
      totalTime += duration;
    });

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / (totalTime / 50)); // Update every 50ms
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          animate={animationPhase !== 'loading' ? { 
            opacity: 1, 
            scale: 1, 
            rotateY: 0 
          } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Logo with Charan Thota branding */}
          <div className="flex flex-col items-center">
            {/* Logo Image */}
            <motion.div
              className="w-32 h-32 mb-4 relative"
              animate={animationPhase === 'particles' ? {
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <img 
                src={logoImage}
                alt="Charan Thota Logo"
                className="w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 60px rgba(192, 192, 192, 0.4))'
                }}
              />
              
              {/* Glare Sweep Overlay on Logo */}
              {animationPhase === 'glare' && (
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
                  initial={{ x: -150, opacity: 0 }}
                  animate={{ x: 150, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)',
                    transform: 'skewX(-20deg)',
                    width: '60px',
                    height: '100%'
                  }}
                />
              )}
            </motion.div>
            
            {/* Main Name */}
            <motion.div
              className="text-4xl font-bold text-center mb-2"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #B8860B 75%, #DAA520 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Charan Thota
            </motion.div>
            
            {/* Subtitle */}
            <motion.div
              className="text-sm tracking-widest text-center"
              style={{
                background: 'linear-gradient(45deg, #F8F8FF 0%, #E6E6FA 25%, #C0C0C0 50%, #A9A9A9 75%, #808080 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 10px rgba(192, 192, 192, 0.4))',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              SOFTWARE & ML ENGINEER
            </motion.div>
          </div>

          {/* Particles Effect */}
          <AnimatePresence>
            {animationPhase === 'particles' && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-400 text-xl"
                    style={{
                      left: Math.random() * 200,
                      top: Math.random() * 80,
                    }}
                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.7, 0],
                      rotate: 360,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mt-12 w-80 h-1 bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-[length:200%_100%]"
            style={{ width: `${progress}%` }}
            animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
            transition={{
              backgroundPosition: {
                repeat: Infinity,
                duration: 2,
                ease: "linear"
              }
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LogoAnimation;