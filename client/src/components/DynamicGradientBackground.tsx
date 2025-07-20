import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface DynamicGradientBackgroundProps {
  children: React.ReactNode;
}

interface GradientSection {
  id: string;
  colors: string[];
  position: number;
}

const DynamicGradientBackground = ({ children }: DynamicGradientBackgroundProps) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // Define section-specific gradients
  const sectionGradients: Record<string, string[]> = {
    home: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
    about: ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
    experience: ['#fa709a', '#fee140', '#ff9a9e', '#fecfef'],
    projects: ['#a8edea', '#fed6e3', '#96fbc4', '#f9f047'],
    skills: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
    contact: ['#ff9a9e', '#fecfef', '#ffecd2', '#fcb69f']
  };

  // Handle scroll to detect active section
  const handleScroll = useCallback(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
    const scrollPosition = window.scrollY + 200; // offset for navbar

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  // Get current gradient colors
  const currentGradient = sectionGradients[activeSection] || sectionGradients.home;

  // Create dynamic gradient based on mouse position
  const createDynamicGradient = () => {
    const [color1, color2, color3, color4] = currentGradient;
    
    // Calculate gradient positions based on mouse
    const centerX = 50 + (mousePosition.x - 0.5) * 20;
    const centerY = 50 + (mousePosition.y - 0.5) * 20;
    
    return `
      radial-gradient(circle at ${centerX}% ${centerY}%, ${color1} 0%, transparent 50%),
      radial-gradient(circle at ${100 - centerX}% ${100 - centerY}%, ${color2} 0%, transparent 50%),
      radial-gradient(circle at ${centerX + 25}% ${centerY - 25}%, ${color3} 0%, transparent 50%),
      radial-gradient(circle at ${centerX - 25}% ${centerY + 25}%, ${color4} 0%, transparent 50%),
      linear-gradient(135deg, ${color1}20 0%, ${color2}20 25%, ${color3}20 50%, ${color4}20 75%, ${color1}20 100%)
    `;
  };

  return (
    <div className="relative min-h-screen">
      {/* Base gradient background */}
      <motion.div
        className="fixed inset-0 z-[-2]"
        animate={{
          background: `linear-gradient(135deg, ${currentGradient[0]}40 0%, ${currentGradient[1]}40 25%, ${currentGradient[2]}40 50%, ${currentGradient[3]}40 75%, ${currentGradient[0]}40 100%)`
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut"
        }}
      />

      {/* Interactive gradient overlay */}
      <motion.div
        className="fixed inset-0 z-[-1] opacity-30"
        style={{
          background: createDynamicGradient(),
          mixBlendMode: 'multiply'
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* White overlay for readability */}
      <div className="fixed inset-0 z-[-1] bg-white/80" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Section indicator (optional) */}
      <div className="fixed bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
      </div>
    </div>
  );
};

export default DynamicGradientBackground;