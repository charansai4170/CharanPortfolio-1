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
              className="w-48 h-48 mb-6 relative"
              animate={
                animationPhase === 'logo' ? {
                  scale: [0.5, 1.2, 1],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 1]
                } : 
                animationPhase === 'particles' ? {
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                } : {}
              }
              transition={{ 
                duration: animationPhase === 'logo' ? 1.5 : 3,
                ease: "easeInOut",
                repeat: animationPhase === 'particles' ? Infinity : 0
              }}
            >
              <img 
                src={logoImage}
                alt="Charan Thota Logo"
                className="w-full h-full object-contain"
                style={{
                  filter: `
                    drop-shadow(0 0 40px rgba(255, 215, 0, 0.9)) 
                    drop-shadow(0 0 80px rgba(192, 192, 192, 0.6))
                    drop-shadow(0 0 120px rgba(255, 215, 0, 0.3))
                  `
                }}
              />
              
              {/* Multiple Glare Effects */}
              {animationPhase === 'glare' && (
                <>
                  {/* Main Glare Sweep */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 200, opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)',
                      transform: 'skewX(-25deg)',
                      width: '80px',
                      height: '100%'
                    }}
                  />
                  {/* Secondary Glare */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    initial={{ x: -180, opacity: 0 }}
                    animate={{ x: 180, opacity: [0, 0.6, 0] }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.7) 50%, transparent 100%)',
                      transform: 'skewX(-15deg)',
                      width: '40px',
                      height: '100%'
                    }}
                  />
                </>
              )}
            </motion.div>
            
            {/* Main Name */}
            <motion.div
              className="text-5xl font-bold text-center mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={animationPhase !== 'loading' ? { 
                opacity: 1, 
                y: 0,
                scale: [1, 1.05, 1]
              } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #B8860B 75%, #DAA520 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px rgba(255, 215, 0, 0.8))',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Charan Thota
            </motion.div>
            
            {/* Subtitle */}
            <motion.div
              className="text-base tracking-wider text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={animationPhase !== 'loading' ? { 
                opacity: 1, 
                y: 0 
              } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                background: 'linear-gradient(45deg, #F8F8FF 0%, #E6E6FA 25%, #C0C0C0 50%, #A9A9A9 75%, #808080 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 15px rgba(192, 192, 192, 0.6))',
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