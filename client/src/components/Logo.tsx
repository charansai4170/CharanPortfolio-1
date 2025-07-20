interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 48 }: LogoProps) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: size, 
        height: size,
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
      }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 120 120" 
        xmlns="http://www.w3.org/2000/svg"
        className="metallic-paint-animation"
      >
        <defs>
          {/* Metallic paint gradient with animation */}
          <linearGradient id="metallicPaint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C0C0C0">
              <animate attributeName="stop-color" 
                values="#C0C0C0;#E8E8E8;#F5F5F5;#E8E8E8;#C0C0C0" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="25%" stopColor="#E8E8E8">
              <animate attributeName="stop-color" 
                values="#E8E8E8;#F5F5F5;#FFFFFF;#F5F5F5;#E8E8E8" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#F5F5F5">
              <animate attributeName="stop-color" 
                values="#F5F5F5;#FFFFFF;#F8F8F8;#FFFFFF;#F5F5F5" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="75%" stopColor="#D3D3D3">
              <animate attributeName="stop-color" 
                values="#D3D3D3;#E8E8E8;#F0F0F0;#E8E8E8;#D3D3D3" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#A8A8A8">
              <animate attributeName="stop-color" 
                values="#A8A8A8;#C0C0C0;#D3D3D3;#C0C0C0;#A8A8A8" 
                dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          {/* Gold paint gradient with animation */}
          <linearGradient id="goldPaint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DAA520">
              <animate attributeName="stop-color" 
                values="#DAA520;#FFD700;#FFF8DC;#FFD700;#DAA520" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="30%" stopColor="#FFD700">
              <animate attributeName="stop-color" 
                values="#FFD700;#FFF8DC;#FFFACD;#FFF8DC;#FFD700" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="70%" stopColor="#F4A460">
              <animate attributeName="stop-color" 
                values="#F4A460;#FFD700;#FFF8DC;#FFD700;#F4A460" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#CD853F">
              <animate attributeName="stop-color" 
                values="#CD853F;#DAA520;#F4A460;#DAA520;#CD853F" 
                dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          {/* Animated highlight */}
          <linearGradient id="highlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0">
              <animate attributeName="stop-opacity" 
                values="0;0.8;0" 
                dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0">
              <animate attributeName="stop-opacity" 
                values="0;1;0" 
                dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0">
              <animate attributeName="stop-opacity" 
                values="0;0.8;0" 
                dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          {/* Frame gradient */}
          <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8E8E93" />
            <stop offset="50%" stopColor="#C7C7CC" />
            <stop offset="100%" stopColor="#6D6D70" />
          </linearGradient>
          
          {/* Shadow filter */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="1" dy="2" result="offset"/>
            <feFlood floodColor="#000000" floodOpacity="0.3"/>
            <feComposite in2="offset" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer frame */}
        <rect x="5" y="5" width="110" height="110" 
              fill="url(#frameGradient)" 
              stroke="#5A5A5A" 
              strokeWidth="2" 
              rx="8" 
              filter="url(#shadow)" />
        
        {/* Inner frame */}
        <rect x="15" y="15" width="90" height="90" 
              fill="#F8F8F8" 
              stroke="#BDBDBD" 
              strokeWidth="1" 
              rx="4" />
        
        {/* Outer C arc - metallic with animation */}
        <path
          d="M 88 28 A 32 32 0 1 0 88 92"
          fill="none"
          stroke="url(#metallicPaint)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Inner C arc - gold with animation */}
        <path
          d="M 80 42 A 18 18 0 1 0 80 78"
          fill="none"
          stroke="url(#goldPaint)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Animated highlight sweep */}
        <path
          d="M 88 28 A 32 32 0 1 0 88 92"
          fill="none"
          stroke="url(#highlight)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Logo;