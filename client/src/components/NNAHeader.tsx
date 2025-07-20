import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/ChatGPT Image Jul 20, 2025, 01_27_37 AM_1753041763555.png";
import usePageTransition from "@/hooks/usePageTransition";

interface CharanHeaderProps {
  onMenuClick: () => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

const CharanHeader = ({ onMenuClick, darkMode, onThemeToggle }: CharanHeaderProps) => {
  const [logoHovered, setLogoHovered] = useState(false);
  const { navigateWithTransition } = usePageTransition();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-30 h-16 backdrop-blur-xl bg-white/10 border-b border-white/10"
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Logo Section */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          onHoverStart={() => setLogoHovered(true)}
          onHoverEnd={() => setLogoHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateWithTransition("/legacy", "Home", "Legacy Portfolio")}
        >
          {/* Logo Icon */}
          <motion.div
            className="w-12 h-12 flex items-center justify-center relative"
            animate={logoHovered ? { 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.15, 1]
            } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img 
              src={logoImage}
              alt="Charan Thota Logo"
              className="w-full h-full object-contain"
              style={{ 
                filter: logoHovered 
                  ? 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 30px rgba(192, 192, 192, 0.4))' 
                  : 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))' 
              }}
            />
            {/* Enhanced Glare Effect on Hover */}
            {logoHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 60, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)',
                  transform: 'skewX(-20deg)',
                  width: '20px',
                  height: '100%',
                  borderRadius: '50%'
                }}
              />
            )}
          </motion.div>
          
          {/* Charan Thota Text with Gradient */}
          <motion.div
            className="text-lg font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent"
            animate={logoHovered ? {
              backgroundPosition: ['-200% 0', '200% 0']
            } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ 
              backgroundSize: '200% 100%',
              filter: logoHovered ? 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))' : 'none'
            }}
          >
            Charan Thota
          </motion.div>
        </motion.div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Settings/Demo Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateWithTransition("/legacy", "Home", "Legacy Portfolio")}
            className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <motion.div
              initial={false}
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.div>
          </Button>

          {/* Menu Trigger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="h-5 w-5" />
            </motion.div>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default CharanHeader;