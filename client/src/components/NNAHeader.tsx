import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CharanHeaderProps {
  onMenuClick: () => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

const CharanHeader = ({ onMenuClick, darkMode, onThemeToggle }: CharanHeaderProps) => {
  const [logoHovered, setLogoHovered] = useState(false);

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
        >
          {/* Lightning Bolt Icon */}
          <motion.div
            className="text-yellow-400 text-2xl"
            animate={logoHovered ? { rotate: [0, -15, 15, 0] } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            ⚡
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
          {/* Settings Button */}
          <Button
            variant="ghost"
            size="icon"
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