interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 40 }: LogoProps) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Metallic gradient for top */}
        <linearGradient id="metallicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5E7EB" />
          <stop offset="30%" stopColor="#F9FAFB" />
          <stop offset="70%" stopColor="#D1D5DB" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>
        
        {/* Gold gradient for bottom */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="30%" stopColor="#FDE047" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        
        {/* Shadow filter */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="4" result="offset"/>
          <feFlood floodColor="#000000" floodOpacity="0.3"/>
          <feComposite in2="offset" operator="in"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Glow effect */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer C arc - metallic */}
      <path
        d="M 75 20 A 30 30 0 1 0 75 80"
        fill="none"
        stroke="url(#metallicGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        filter="url(#shadow)"
      />
      
      {/* Inner C arc - gold */}
      <path
        d="M 65 35 A 15 15 0 1 0 65 65"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      
      {/* Additional metallic highlight on outer arc */}
      <path
        d="M 75 20 A 30 30 0 0 0 50 15"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
};

export default Logo;