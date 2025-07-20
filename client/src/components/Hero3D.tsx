import { useRef, useEffect } from "react";

interface FloatingShapeProps {
  className: string;
  style: React.CSSProperties;
  children: React.ReactNode;
}

const FloatingShape = ({ className, style, children }: FloatingShapeProps) => {
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shape = shapeRef.current;
    if (!shape) return;

    const animate = () => {
      const time = Date.now() * 0.001;
      const x = Math.sin(time * 0.5) * 10;
      const y = Math.cos(time * 0.7) * 15;
      const rotate = time * 20;
      
      shape.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div ref={shapeRef} className={className} style={style}>
      {children}
    </div>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Large 3D-style Geometric Shapes */}
      <FloatingShape
        className="absolute opacity-15"
        style={{ top: '5%', left: '8%' }}
      >
        <div className="w-20 h-20 border-2 border-primary-custom transform rotate-45 animate-rotate3d" 
             style={{ 
               background: 'linear-gradient(45deg, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.1))',
               borderRadius: '20% 80% 20% 80%'
             }} />
      </FloatingShape>
      
      <FloatingShape
        className="absolute opacity-20"
        style={{ top: '15%', right: '10%' }}
      >
        <div className="w-16 h-16 bg-gradient-to-r from-accent-custom to-primary-custom animate-morph" 
             style={{ opacity: 0.6 }} />
      </FloatingShape>
      
      <FloatingShape
        className="absolute opacity-25"
        style={{ bottom: '20%', left: '15%' }}
      >
        <div className="w-24 h-24 border-2 border-accent-custom rounded-full animate-spin tech-card-3d" 
             style={{ 
               animationDuration: '12s',
               background: 'conic-gradient(from 45deg, rgba(14, 165, 233, 0.1), rgba(37, 99, 235, 0.2), rgba(14, 165, 233, 0.1))'
             }} />
      </FloatingShape>
      
      <FloatingShape
        className="absolute opacity-15"
        style={{ bottom: '10%', right: '20%' }}
      >
        <div className="w-18 h-18 bg-primary-custom transform rotate-12 animate-pulse tech-card-3d"
             style={{ 
               clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
               width: '4rem',
               height: '4rem'
             }} />
      </FloatingShape>
      
      <FloatingShape
        className="absolute opacity-30"
        style={{ top: '45%', left: '3%' }}
      >
        <div className="w-6 h-6 bg-gradient-to-r from-primary-custom to-accent-custom rounded-full animate-ping"
             style={{ animationDuration: '3s' }} />
      </FloatingShape>
      
      <FloatingShape
        className="absolute opacity-20"
        style={{ top: '25%', right: '25%' }}
      >
        <div className="w-12 h-12 border-2 border-primary-custom transform rotate-45 animate-rotate3d"
             style={{ 
               background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.2))',
               borderRadius: '30%'
             }} />
      </FloatingShape>

      {/* New 3D-style elements */}
      <FloatingShape
        className="absolute opacity-10"
        style={{ top: '60%', right: '5%' }}
      >
        <div className="w-28 h-28 animate-rotate3d" 
             style={{ 
               background: 'linear-gradient(45deg, rgba(37, 99, 235, 0.05), rgba(14, 165, 233, 0.1), rgba(37, 99, 235, 0.05))',
               borderRadius: '40% 60% 40% 60%',
               border: '1px solid rgba(37, 99, 235, 0.2)'
             }} />
      </FloatingShape>

      <FloatingShape
        className="absolute opacity-25"
        style={{ bottom: '40%', left: '40%' }}
      >
        <div className="w-8 h-8 bg-accent-custom animate-morph"
             style={{ 
               clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
             }} />
      </FloatingShape>
      
      {/* Enhanced Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full animate-drift" style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.05) 0%, transparent 70%)
          `,
          backgroundSize: '60px 60px, 60px 60px, 200px 200px'
        }} />
      </div>
      
      {/* Animated Particles with varying sizes */}
      {[...Array(8)].map((_, i) => {
        const size = 2 + Math.random() * 4;
        const delay = i * 2;
        return (
          <FloatingShape
            key={i}
            className="absolute opacity-60"
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 90 + 5}%`,
              animationDelay: `${delay}s`
            }}
          >
            <div 
              className="bg-primary-custom rounded-full animate-particles"
              style={{ 
                width: `${size}px`, 
                height: `${size}px`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          </FloatingShape>
        );
      })}

      {/* Glassmorphism overlay elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 glass-card rounded-full opacity-10 animate-pulse" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-20 h-20 glass-card rounded-lg opacity-15 animate-pulse" 
           style={{ animationDuration: '6s', animationDelay: '2s' }} />
    </div>
  );
};

export default Hero3D;
