interface LogoProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

const Logo = ({ className = "", size = 64, onClick }: LogoProps) => {
  return (
    <div 
      className={`relative ${className}`}
      onClick={onClick}
      style={{ 
        width: size, 
        height: size,
        filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25))'
      }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="metallic-paint-animation"
      >
        <defs>
          {/* Outer metallic silver gradient */}
          <radialGradient id="outerSilver" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F8F9FA">
              <animate attributeName="stop-color" 
                values="#F8F9FA;#FFFFFF;#F1F3F4;#FFFFFF;#F8F9FA" 
                dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="30%" stopColor="#E8EAED">
              <animate attributeName="stop-color" 
                values="#E8EAED;#F1F3F4;#DADCE0;#F1F3F4;#E8EAED" 
                dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="70%" stopColor="#DADCE0">
              <animate attributeName="stop-color" 
                values="#DADCE0;#E8EAED;#BDC1C6;#E8EAED;#DADCE0" 
                dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#9AA0A6">
              <animate attributeName="stop-color" 
                values="#9AA0A6;#BDC1C6;#80868B;#BDC1C6;#9AA0A6" 
                dur="4s" repeatCount="indefinite" />
            </stop>
          </radialGradient>
          
          {/* Middle metallic gradient */}
          <radialGradient id="middleSilver" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#F1F3F4">
              <animate attributeName="stop-color" 
                values="#F1F3F4;#FFFFFF;#E8EAED;#FFFFFF;#F1F3F4" 
                dur="3.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#DADCE0">
              <animate attributeName="stop-color" 
                values="#DADCE0;#F1F3F4;#BDC1C6;#F1F3F4;#DADCE0" 
                dur="3.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#BDC1C6">
              <animate attributeName="stop-color" 
                values="#BDC1C6;#DADCE0;#9AA0A6;#DADCE0;#BDC1C6" 
                dur="3.5s" repeatCount="indefinite" />
            </stop>
          </radialGradient>
          
          {/* Inner gold gradient */}
          <radialGradient id="innerGold" cx="35%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#FFF8E1">
              <animate attributeName="stop-color" 
                values="#FFF8E1;#FFFDE7;#FFF3C4;#FFFDE7;#FFF8E1" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="40%" stopColor="#FFD54F">
              <animate attributeName="stop-color" 
                values="#FFD54F;#FFEB3B;#FFC107;#FFEB3B;#FFD54F" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="80%" stopColor="#FF8F00">
              <animate attributeName="stop-color" 
                values="#FF8F00;#FFD54F;#E65100;#FFD54F;#FF8F00" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#BF360C">
              <animate attributeName="stop-color" 
                values="#BF360C;#FF8F00;#8D6E63;#FF8F00;#BF360C" 
                dur="3s" repeatCount="indefinite" />
            </stop>
          </radialGradient>
          
          {/* Highlight sweep */}
          <linearGradient id="highlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0">
              <animate attributeName="stop-opacity" 
                values="0;0.9;0" 
                dur="2.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0">
              <animate attributeName="stop-opacity" 
                values="0;1;0" 
                dur="2.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0">
              <animate attributeName="stop-opacity" 
                values="0;0.9;0" 
                dur="2.5s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          {/* Shadow filter */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="4" result="offset"/>
            <feFlood floodColor="#000000" floodOpacity="0.2"/>
            <feComposite in2="offset" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outermost C layer - largest silver */}
        <path
          d="M 80 15 A 35 35 0 1 0 80 85"
          fill="url(#outerSilver)"
          stroke="#5F6368"
          strokeWidth="1"
          filter="url(#shadow)"
        />
        
        {/* Second C layer - medium silver */}
        <path
          d="M 75 25 A 25 25 0 1 0 75 75"
          fill="url(#middleSilver)"
          stroke="#80868B"
          strokeWidth="0.5"
        />
        
        {/* Third C layer - smaller silver */}
        <path
          d="M 70 30 A 20 20 0 1 0 70 70"
          fill="url(#middleSilver)"
          stroke="#9AA0A6"
          strokeWidth="0.5"
        />
        
        {/* Innermost C layer - gold */}
        <path
          d="M 65 35 A 15 15 0 1 0 65 65"
          fill="url(#innerGold)"
          stroke="#E65100"
          strokeWidth="0.5"
        />
        
        {/* Highlight overlay */}
        <path
          d="M 80 15 A 35 35 0 1 0 80 85"
          fill="url(#highlight)"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};

export default Logo;