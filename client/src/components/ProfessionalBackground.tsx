interface ProfessionalBackgroundProps {
  variant?: 'light' | 'dark' | 'neutral';
  pattern?: 'geometric' | 'grid' | 'dots' | 'particles' | 'waves' | 'all';
  className?: string;
  children: React.ReactNode;
}

const ProfessionalBackground = ({ 
  variant = 'light', 
  pattern = 'all', 
  className = '', 
  children 
}: ProfessionalBackgroundProps) => {
  const baseClass = variant === 'dark' ? 'professional-bg-dark' : 'professional-bg';
  
  return (
    <div className={`${baseClass} ${className}`}>
      {/* Background Patterns */}
      {(pattern === 'grid' || pattern === 'all') && <div className="grid-pattern" />}
      {(pattern === 'dots' || pattern === 'all') && <div className="dot-matrix" />}
      
      {/* Geometric Elements */}
      {(pattern === 'geometric' || pattern === 'all') && (
        <div className="geometric-bg">
          <div className="geometric-element"></div>
          <div className="geometric-element"></div>
          <div className="geometric-element"></div>
          <div className="geometric-element"></div>
        </div>
      )}
      
      {/* Particle System */}
      {(pattern === 'particles' || pattern === 'all') && (
        <div className="particle-system">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      )}
      
      {/* Wave Pattern for bottom sections */}
      {pattern === 'waves' && <div className="wave-pattern" />}
      
      {/* Gradient Overlays */}
      <div className="gradient-overlay-top" />
      <div className="gradient-overlay-bottom" />
      
      {/* Content Wrapper */}
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default ProfessionalBackground;