import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  value: number;
  maxValue: number;
  unit: string;
  icon: string;
  color: string;
  description: string;
}

interface AchievementVisualizationsProps {
  className?: string;
}

const AchievementVisualizations = ({ className = "" }: AchievementVisualizationsProps) => {
  const [achievements] = useState<Achievement[]>([
    {
      id: 'experience',
      title: 'Years Experience',
      value: 2.5,
      maxValue: 5,
      unit: 'years',
      icon: '⚡',
      color: '#2563EB',
      description: 'Professional development experience'
    },
    {
      id: 'projects',
      title: 'Projects Completed',
      value: 25,
      maxValue: 30,
      unit: 'projects',
      icon: '🚀',
      color: '#0EA5E9',
      description: 'Successfully delivered projects'
    },
    {
      id: 'cost-reduction',
      title: 'Cost Reduction',
      value: 5,
      maxValue: 10,
      unit: 'M$',
      icon: '💰',
      color: '#10B981',
      description: 'Total cost savings achieved'
    },
    {
      id: 'accuracy',
      title: 'ML Model Accuracy',
      value: 92,
      maxValue: 100,
      unit: '%',
      icon: '🎯',
      color: '#F59E0B',
      description: 'Average model performance'
    },
    {
      id: 'data-processed',
      title: 'Records Analyzed',
      value: 10,
      maxValue: 15,
      unit: 'M+',
      icon: '📊',
      color: '#8B5CF6',
      description: 'Total data records processed'
    },
    {
      id: 'efficiency',
      title: 'Efficiency Improvement',
      value: 15,
      maxValue: 20,
      unit: '%',
      icon: '⚡',
      color: '#EF4444',
      description: 'Operational efficiency gains'
    }
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div ref={containerRef} className={`${className}`}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {achievements.map((achievement, index) => (
          <AchievementCard key={achievement.id} achievement={achievement} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

const AchievementCard = ({ achievement, index }: AchievementCardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });
  
  const percentage = (achievement.value / achievement.maxValue) * 100;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = achievement.value * easeOutQuart;
          
          setAnimatedValue(currentValue);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        animate();
      }, index * 200);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, achievement.value, index]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      className="relative group"
    >
      <div 
        className="relative p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${achievement.color}08 0%, ${achievement.color}04 100%)`,
        }}
      >
        {/* Animated background glow */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${achievement.color}20 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="text-3xl animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
            {achievement.icon}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 font-medium">{achievement.title}</div>
          </div>
        </div>

        {/* Main Value Display */}
        <div className="relative z-10 mb-6">
          <div className="flex items-baseline space-x-2">
            <motion.span 
              className="text-4xl font-bold"
              style={{ color: achievement.color }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.1 + 0.5, type: "spring", damping: 10 }}
            >
              {achievement.unit === '%' || achievement.unit === 'years' 
                ? animatedValue.toFixed(1) 
                : Math.round(animatedValue)
              }
            </motion.span>
            <span className="text-lg text-gray-500 font-medium">{achievement.unit}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{achievement.description}</p>
        </div>

        {/* Progress Visualization */}
        <div className="relative z-10 mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Progress</span>
            <span>{Math.round(percentage)}%</span>
          </div>
          
          {/* Progress Bar Background */}
          <div className="w-full h-3 bg-gray-200/50 rounded-full overflow-hidden">
            {/* Animated Progress Fill */}
            <motion.div
              className="h-full rounded-full relative"
              style={{ backgroundColor: achievement.color }}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
              transition={{ 
                delay: index * 0.1 + 0.3, 
                duration: 1.5,
                ease: "easeOut"
              }}
            >
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)`,
                  animation: `shimmer 2s infinite linear`,
                  animationDelay: `${index * 0.2}s`
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Floating Particles */}
        {[...Array(5)].map((_, particleIndex) => (
          <motion.div
            key={particleIndex}
            className="absolute w-1 h-1 rounded-full opacity-60"
            style={{ backgroundColor: achievement.color }}
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0 
            }}
            animate={isInView ? {
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              opacity: [0, 1, 0],
            } : {}}
            transition={{
              delay: index * 0.1 + particleIndex * 0.3,
              duration: 3,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementVisualizations;