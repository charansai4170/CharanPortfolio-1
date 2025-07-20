import { useEffect, useState, useRef } from "react";

interface SkillBarProps {
  skill: string;
  percentage: number;
  color?: string;
  delay?: number;
}

const SkillBar = ({ skill, percentage, color = "bg-primary", delay = 0 }: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => {
            setWidth(percentage);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, [percentage, delay, isVisible]);

  return (
    <div ref={barRef} className="skill-item">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-text">{skill}</span>
        <span className={`text-primary-custom font-medium`}>{percentage}%</span>
      </div>
      <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`${color} h-full rounded-full skill-bar transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
