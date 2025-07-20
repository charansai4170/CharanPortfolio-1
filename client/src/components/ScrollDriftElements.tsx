import { useEffect, useState } from "react";

interface DriftElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
  shape: 'circle' | 'square' | 'triangle' | 'hexagon';
  color: string;
}

const ScrollDriftElements = () => {
  const [elements, setElements] = useState<DriftElement[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Show drift elements when user starts scrolling
      if (currentScrollY > 100 && !isVisible) {
        setIsVisible(true);
        generateElements();
      } else if (currentScrollY <= 100 && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const generateElements = () => {
    const newElements: DriftElement[] = [];
    const shapes: Array<'circle' | 'square' | 'triangle' | 'hexagon'> = ['circle', 'square', 'triangle', 'hexagon'];
    const colors = ['rgba(37, 99, 235, 0.1)', 'rgba(14, 165, 233, 0.1)', 'rgba(147, 51, 234, 0.1)'];

    for (let i = 0; i < 6; i++) {
      newElements.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight + scrollY,
        size: 20 + Math.random() * 40,
        opacity: 0.3 + Math.random() * 0.4,
        speed: 0.5 + Math.random() * 1.5,
        direction: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setElements(newElements);
  };

  useEffect(() => {
    if (!isVisible) return;

    const animateElements = () => {
      setElements(prevElements => 
        prevElements.map(element => {
          const radians = (element.direction * Math.PI) / 180;
          let newX = element.x + Math.cos(radians) * element.speed;
          let newY = element.y + Math.sin(radians) * element.speed * 0.3; // Slower vertical movement

          // Wrap around screen edges
          if (newX > window.innerWidth + 50) newX = -50;
          if (newX < -50) newX = window.innerWidth + 50;
          if (newY > scrollY + window.innerHeight + 50) newY = scrollY - 50;
          if (newY < scrollY - 50) newY = scrollY + window.innerHeight + 50;

          return {
            ...element,
            x: newX,
            y: newY,
            direction: element.direction + (Math.random() - 0.5) * 2 // Slight random direction change
          };
        })
      );
    };

    const interval = setInterval(animateElements, 50);
    return () => clearInterval(interval);
  }, [isVisible, scrollY]);

  const getShapeStyle = (element: DriftElement) => {
    const baseStyle = {
      position: 'fixed' as const,
      left: `${element.x}px`,
      top: `${element.y - scrollY}px`,
      width: `${element.size}px`,
      height: `${element.size}px`,
      opacity: element.opacity,
      pointerEvents: 'none' as const,
      transition: 'all 0.1s linear',
      zIndex: 1,
    };

    switch (element.shape) {
      case 'circle':
        return {
          ...baseStyle,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${element.color}, ${element.color.replace('0.1', '0.2')})`,
          border: `1px solid ${element.color.replace('0.1', '0.3')}`,
        };
      case 'square':
        return {
          ...baseStyle,
          background: element.color,
          border: `1px solid ${element.color.replace('0.1', '0.3')}`,
          transform: `rotate(${element.direction}deg)`,
        };
      case 'triangle':
        return {
          ...baseStyle,
          width: 0,
          height: 0,
          borderLeft: `${element.size / 2}px solid transparent`,
          borderRight: `${element.size / 2}px solid transparent`,
          borderBottom: `${element.size}px solid ${element.color}`,
          background: 'transparent',
          transform: `rotate(${element.direction}deg)`,
        };
      case 'hexagon':
        return {
          ...baseStyle,
          background: element.color,
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
          border: `1px solid ${element.color.replace('0.1', '0.3')}`,
          transform: `rotate(${element.direction}deg)`,
        };
      default:
        return baseStyle;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-1">
      {elements.map((element) => (
        <div
          key={element.id}
          style={getShapeStyle(element)}
          className="animate-pulse"
        />
      ))}
    </div>
  );
};

export default ScrollDriftElements;