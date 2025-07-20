import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: Array<{
    label: string;
    value: string;
    color: string;
  }>;
  skills: string[];
  type: 'work' | 'education';
}

interface ExperienceTimelineProps {
  className?: string;
}

const ExperienceTimeline = ({ className = "" }: ExperienceTimelineProps) => {
  const [experiences] = useState<ExperienceItem[]>([
    {
      id: 'software-developer',
      title: 'Software Developer',
      company: 'Merites Solution LLC - CMS',
      period: 'Oct 2024 - Present',
      description: 'Developed AI-powered medical document review system for CMS-compliant analysis using OCR and ML models.',
      achievements: [
        { label: 'Days Processed', value: '150+', color: '#0EA5E9' },
        { label: 'Accuracy', value: '100%', color: '#10B981' }
      ],
      skills: ['Python', 'Flask', 'Docker', 'AWS', 'ReactJS'],
      type: 'work'
    },
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      company: 'Varenyq Inc',
      period: 'Jun - Sep 2024',
      description: 'Analyzed 10M+ patient records, built predictive models achieving 75% accuracy in readmission forecasting.',
      achievements: [
        { label: 'Records', value: '10M+', color: '#8B5CF6' },
        { label: 'Accuracy', value: '75%', color: '#F59E0B' },
        { label: 'Cost Savings', value: '$5M', color: '#10B981' }
      ],
      skills: ['SQL', 'Python', 'AWS RedShift', 'Power BI', 'ML Models'],
      type: 'work'
    },
    {
      id: 'masters',
      title: "Master's in Analytics",
      company: 'Northeastern University',
      period: 'July 2023',
      description: 'Advanced studies in data analytics, machine learning, and statistical modeling with focus on healthcare applications.',
      achievements: [
        { label: 'GPA', value: '3.8', color: '#EF4444' },
        { label: 'Award', value: 'Star Award', color: '#10B981' }
      ],
      skills: ['Statistics', 'Machine Learning', 'Data Mining', 'Python', 'R'],
      type: 'education'
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
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-accent-custom">Experience</span>
        </h2>
        <div className="w-24 h-1 bg-accent-custom mx-auto rounded-full"></div>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent-custom via-primary-custom to-accent-custom opacity-60"></div>
        
        {/* Timeline Items */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.3, delayChildren: 0.2 }
            }
          }}
          className="space-y-16"
        >
          {experiences.map((experience, index) => (
            <ExperienceCard 
              key={experience.id} 
              experience={experience} 
              index={index} 
              isLeft={index % 2 === 0}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  isLeft: boolean;
}

const ExperienceCard = ({ experience, index, isLeft }: ExperienceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? -100 : 100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
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
      className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: index * 0.2 + 0.5, type: "spring", damping: 10 }}
          className="w-6 h-6 bg-accent-custom rounded-full border-4 border-white shadow-lg"
        >
          <div className="absolute inset-0 bg-accent-custom rounded-full animate-ping opacity-30"></div>
        </motion.div>
      </div>

      {/* Experience Card */}
      <div 
        className={`relative w-full max-w-md ${isLeft ? 'mr-8' : 'ml-8'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative group">
          {/* Card Background with Glare Effect */}
          <div 
            className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-accent-custom/20 hover:shadow-2xl"
          >
            {/* Animated Glare Effect */}
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
                isHovered ? 'translate-x-full' : '-translate-x-full'
              }`}
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 80%, transparent 100%)',
                animation: isInView ? 'glare-sweep 3s infinite 2s' : 'none',
              }}
            />
            
            {/* Border Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-custom/20 via-primary-custom/20 to-accent-custom/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
                  <p className="text-gray-300 font-medium">{experience.company}</p>
                </div>
                <span className="text-accent-custom text-sm font-medium px-3 py-1 bg-accent-custom/20 rounded-full">
                  {experience.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {experience.description}
              </p>

              {/* Achievements */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {experience.achievements.map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + idx * 0.1 + 0.8 }}
                    className="text-center p-3 bg-slate-700/50 rounded-xl border border-slate-600"
                  >
                    <div 
                      className="text-2xl font-bold mb-1"
                      style={{ color: achievement.color }}
                    >
                      {achievement.value}
                    </div>
                    <div className="text-xs text-gray-400">{achievement.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + idx * 0.05 + 1.2 }}
                    className="px-3 py-1 text-xs bg-primary-custom/20 text-primary-custom rounded-full border border-primary-custom/30"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Connection Line to Timeline */}
          <div 
            className={`absolute top-8 w-8 h-px bg-gradient-to-r ${
              isLeft 
                ? 'right-0 from-transparent to-accent-custom' 
                : 'left-0 from-accent-custom to-transparent'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceTimeline;