import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Award, Target, Zap, DollarSign, Users, Database, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Achievement {
  id: string;
  title: string;
  value: number;
  unit: string;
  category: 'performance' | 'financial' | 'technical' | 'impact';
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  animationDuration: number;
}

const AchievementsVisualization = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  const achievements: Achievement[] = [
    {
      id: 'cost-reduction',
      title: 'Cost Reduction',
      value: 5,
      unit: 'M',
      category: 'financial',
      description: 'Automated data extraction and dashboard creation resulting in significant operational savings',
      icon: <DollarSign className="h-6 w-6" />,
      color: '#10B981',
      gradient: 'from-emerald-500 to-emerald-600',
      animationDuration: 2.5
    },
    {
      id: 'records-analyzed',
      title: 'Patient Records Analyzed',
      value: 10,
      unit: 'M+',
      category: 'technical',
      description: 'Processed and analyzed massive healthcare datasets with advanced SQL and Python',
      icon: <Database className="h-6 w-6" />,
      color: '#3B82F6',
      gradient: 'from-blue-500 to-blue-600',
      animationDuration: 3.0
    },
    {
      id: 'ml-accuracy',
      title: 'ML Model Accuracy',
      value: 90,
      unit: '%+',
      category: 'technical',
      description: 'Achieved high accuracy in predictive models for healthcare and board performance',
      icon: <Brain className="h-6 w-6" />,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-purple-600',
      animationDuration: 2.0
    },
    {
      id: 'efficiency-boost',
      title: 'Efficiency Improvement',
      value: 15,
      unit: '%',
      category: 'performance',
      description: 'Enhanced operational efficiency through automated workflows and data pipelines',
      icon: <TrendingUp className="h-6 w-6" />,
      color: '#F59E0B',
      gradient: 'from-amber-500 to-amber-600',
      animationDuration: 2.2
    },
    {
      id: 'query-time-reduction',
      title: 'Query Time Reduction',
      value: 95,
      unit: '%',
      category: 'performance',
      description: 'Reduced EHR query time from 20 minutes to under 10 seconds with RAG systems',
      icon: <Zap className="h-6 w-6" />,
      color: '#EF4444',
      gradient: 'from-red-500 to-red-600',
      animationDuration: 1.8
    },
    {
      id: 'time-saved',
      title: 'Annual Time Saved',
      value: 500,
      unit: '+hrs',
      category: 'impact',
      description: 'Created 20+ dashboards saving significant manual work hours annually',
      icon: <Target className="h-6 w-6" />,
      color: '#06B6D4',
      gradient: 'from-cyan-500 to-cyan-600',
      animationDuration: 2.8
    }
  ];

  const categoryConfig = {
    performance: { name: 'Performance', color: '#F59E0B', bg: 'bg-amber-50' },
    financial: { name: 'Financial Impact', color: '#10B981', bg: 'bg-emerald-50' },
    technical: { name: 'Technical Excellence', color: '#3B82F6', bg: 'bg-blue-50' },
    impact: { name: 'Business Impact', color: '#8B5CF6', bg: 'bg-purple-50' }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      
      // Animate numbers
      achievements.forEach((achievement) => {
        let start = 0;
        const end = achievement.value;
        const duration = achievement.animationDuration * 1000;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);
          const current = start + (end - start) * easeOutCubic;
          
          setAnimatedValues(prev => ({
            ...prev,
            [achievement.id]: current
          }));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        // Delay animation based on index
        setTimeout(animate, achievements.indexOf(achievement) * 200);
      });
    }
  }, [isInView, controls]);

  const formatValue = (achievement: Achievement, animatedValue: number) => {
    if (achievement.unit === 'M' || achievement.unit === 'M+') {
      return animatedValue.toFixed(1);
    } else if (achievement.unit === '%' || achievement.unit === '%+') {
      return Math.round(animatedValue);
    } else if (achievement.unit === '+hrs') {
      return Math.round(animatedValue);
    }
    return Math.round(animatedValue);
  };

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Achievements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quantifiable impact across multiple domains - from cost savings to technical excellence
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
            }}
          >
            {Object.entries(categoryConfig).map(([key, config]) => (
              <Badge
                key={key}
                variant="outline"
                className={`px-4 py-2 text-sm font-medium ${config.bg} border-2`}
                style={{ borderColor: config.color, color: config.color }}
              >
                {config.name}
              </Badge>
            ))}
          </motion.div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {achievements.map((achievement, index) => {
              const animatedValue = animatedValues[achievement.id] || 0;
              const categoryInfo = categoryConfig[achievement.category];
              
              return (
                <motion.div
                  key={achievement.id}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      y: 50,
                      scale: 0.9
                    },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                      transition: { 
                        duration: 0.6,
                        delay: index * 0.1,
                        type: "spring",
                        damping: 20,
                        stiffness: 100
                      }
                    }
                  }}
                >
                  <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:scale-105">
                    {/* Background gradient */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    
                    {/* Category indicator */}
                    <div 
                      className="absolute top-0 left-0 w-full h-1"
                      style={{ backgroundColor: achievement.color }}
                    />

                    <CardContent className="p-6 relative z-10">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div 
                          className="p-3 rounded-xl text-white shadow-lg"
                          style={{ backgroundColor: achievement.color }}
                        >
                          {achievement.icon}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${categoryInfo.bg} border-0 text-xs`}
                          style={{ color: categoryInfo.color }}
                        >
                          {categoryInfo.name}
                        </Badge>
                      </div>

                      {/* Animated Value */}
                      <div className="mb-4">
                        <div className="flex items-baseline">
                          <motion.span 
                            className="text-4xl font-bold"
                            style={{ color: achievement.color }}
                            animate={{ 
                              scale: isInView ? [1, 1.1, 1] : 1 
                            }}
                            transition={{ 
                              duration: 0.5, 
                              delay: index * 0.1 + 0.5 
                            }}
                          >
                            {formatValue(achievement, animatedValue)}
                          </motion.span>
                          <span 
                            className="text-lg font-semibold ml-1"
                            style={{ color: achievement.color }}
                          >
                            {achievement.unit}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mt-2">
                          {achievement.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {achievement.description}
                      </p>

                      {/* Progress bar animation */}
                      <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: achievement.color }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: "100%" } : { width: 0 }}
                          transition={{ 
                            duration: achievement.animationDuration,
                            delay: index * 0.1 + 0.5,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </CardContent>

                    {/* Hover effect */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${achievement.color} 0%, transparent 70%)`
                        }}
                      />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <motion.div
            className="mt-16 text-center"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.8 } }
            }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-full border border-blue-200">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="text-blue-800 font-semibold">
                Proven track record of delivering measurable business impact
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsVisualization;