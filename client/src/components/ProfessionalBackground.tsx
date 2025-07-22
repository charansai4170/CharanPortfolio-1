import React from 'react';

interface ProfessionalBackgroundProps {
  children: React.ReactNode;
  variant?: string;
  pattern?: string;
  className?: string;
}

// Simple wrapper component to replace complex background system
const ProfessionalBackground = ({ children, className = '' }: ProfessionalBackgroundProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ProfessionalBackground;