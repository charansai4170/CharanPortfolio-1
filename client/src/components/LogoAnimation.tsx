import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          {/* SVG Logo */}
          <svg width="200" height="80" viewBox="0 0 200 80" className="relative z-10">
            <defs>
              {/* Gold Metallic Gradient */}
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="25%" stopColor="#FFA500" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="75%" stopColor="#B8860B" />
                <stop offset="100%" stopColor="#DAA520" />
              </linearGradient>
              
              {/* Silver Metallic Gradient */}
              <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8F8FF" />
                <stop offset="25%" stopColor="#E6E6FA" />
                <stop offset="50%" stopColor="#C0C0C0" />
                <stop offset="75%" stopColor="#A9A9A9" />
                <stop offset="100%" stopColor="#808080" />
              </linearGradient>

              {/* Dynamic Glare Effect */}
              <linearGradient id="glareEffect" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="45%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="55%" stopColor="rgba(255,255,255,0)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            {/* Main Logo Text */}
            <text
              x="100"
              y="45"
              textAnchor="middle"
              fill="url(#goldGradient)"
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                fontFamily: 'Inter, sans-serif',
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))'
              }}
            >
              NNA
            </text>
            
            {/* Subtitle */}
            <text
              x="100"
              y="65"
              textAnchor="middle"
              fill="url(#silverGradient)"
              style={{
                fontSize: '12px',
                letterSpacing: '2px',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              PORTFOLIO
            </text>
            
            {/* Glare Sweep Overlay */}
            {animationPhase === 'glare' && (
              <motion.rect
                x="-20"
                y="0"
                width="40"
                height="80"
                fill="url(#glareEffect)"
                transform="skewX(-20deg)"
                initial={{ x: -220 }}
                animate={{ x: 220 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            )}
          </svg>

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