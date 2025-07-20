import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

const LogoAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="relative p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
        }}
        transition={{ duration: 0.2 }}
        style={{
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
        }}
      >
        <Zap className="h-6 w-6 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default LogoAnimation;