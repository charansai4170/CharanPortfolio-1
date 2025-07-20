import { useState, useEffect, useRef } from "react";
import { Menu, X, Home, User, Briefcase, FolderOpen, Settings, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { useLocation } from "wouter";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("home");
  const navRef = useRef<HTMLDivElement>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, width: 0, opacity: 0 });
  const [location, setLocation] = useLocation();
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [dragProgress, setDragProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "experience", "skills", "projects", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection && currentSection !== activeNavItem) {
        setActiveNavItem(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeNavItem]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
      setActiveNavItem(sectionId);
    }
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const navRect = navRef.current?.getBoundingClientRect();
    
    if (navRect) {
      setHoverPosition({
        x: rect.left - navRect.left,
        width: rect.width,
        opacity: 1
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverPosition(prev => ({ ...prev, opacity: 0 }));
  };

  const handleLogoClick = () => {
    // Use the exact same scrollToSection function as the Home navigation button
    scrollToSection('home');
  };

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    // Only handle horizontal swipes (ignore vertical scrolling)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
      e.preventDefault();
      
      // Calculate drag progress for menu animation
      const progress = Math.min(Math.max(deltaX / 200, 0), 1);
      setDragProgress(progress);
      
      // Open menu on right swipe
      if (deltaX > 50 && !isMobileMenuOpen) {
        setIsMobileMenuOpen(true);
        setTouchStart(null);
      }
      // Close menu on left swipe
      else if (deltaX < -50 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setTouchStart(null);
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setDragProgress(0);
  };

  const handlePanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Close menu if swiped left or dragged down significantly
    if (info.offset.x < -100 || info.offset.y > 100) {
      setIsMobileMenuOpen(false);
    }
  };

  // Add touch event listeners for gesture support
  useEffect(() => {
    const handleDocumentTouch = (e: TouchEvent) => {
      // Close menu when touching outside
      if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const touch = e.touches[0];
        if (touch) {
          const rect = menuRef.current.getBoundingClientRect();
          if (touch.clientX < rect.left || touch.clientX > rect.right) {
            setIsMobileMenuOpen(false);
          }
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('touchstart', handleDocumentTouch);
    }

    return () => {
      document.removeEventListener('touchstart', handleDocumentTouch);
    };
  }, [isMobileMenuOpen]);

  // Intelligent spacing algorithm for mobile components
  const getAdaptiveLogoSize = () => {
    if (typeof window === 'undefined') return 48;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Calculate optimal size based on screen dimensions and pixel density
    let baseSize;
    
    // iPhone SE and small phones (320-375px)
    if (width <= 375) {
      baseSize = 40;
    }
    // Standard mobile phones (376-414px) 
    else if (width <= 414) {
      baseSize = 44;
    }
    // Large phones and small tablets (415-768px)
    else if (width <= 768) {
      baseSize = 48;
    }
    // Tablets and larger (769px+)
    else {
      baseSize = 72;
    }
    
    // Adjust for high-DPI displays
    if (pixelRatio > 2) {
      baseSize = Math.round(baseSize * 0.9);
    } else if (pixelRatio > 1.5) {
      baseSize = Math.round(baseSize * 0.95);
    }
    
    // Consider safe area for devices with notches
    const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0');
    if (safeAreaTop > 20) {
      baseSize = Math.round(baseSize * 0.95);
    }
    
    return Math.max(baseSize, 32); // Minimum size for touch accessibility
  };

  const getIntelligentSpacing = () => {
    if (typeof window === 'undefined') return { px: 4, py: 3 };
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Calculate spacing based on screen real estate
    let px, py;
    
    // Compact phones - minimize horizontal padding
    if (width <= 375) {
      px = 4; // 16px
      py = 3; // 12px
    }
    // Standard phones - balanced spacing
    else if (width <= 414) {
      px = 5; // 20px  
      py = 3; // 12px
    }
    // Large phones - comfortable spacing
    else if (width <= 768) {
      px = 6; // 24px
      py = 4; // 16px
    }
    // Tablets and desktop - generous spacing
    else {
      px = 6; // 24px
      py = 4; // 16px
    }
    
    // Adjust for very tall screens (reduce vertical padding)
    const aspectRatio = height / width;
    if (aspectRatio > 2.1) {
      py = Math.max(py - 1, 2);
    }
    
    return { px, py };
  };

  const spacing = getIntelligentSpacing();

  const navigationItems = [
    { label: "Home", section: "home", icon: Home, route: "/" },
    { label: "About", section: "about", icon: User, route: "#about" },
    { label: "Experience", section: "experience", icon: Briefcase, route: "#experience" },
    { label: "Skills", section: "skills", icon: Settings, route: "#skills" },
    { label: "Projects", section: "projects", icon: FolderOpen, route: "#projects" },
    { label: "Contact", section: "contact", icon: Mail, route: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      <div 
        className="container mx-auto"
        style={{ 
          paddingLeft: `${spacing.px * 4}px`, 
          paddingRight: `${spacing.px * 4}px`,
          paddingTop: `${spacing.py * 4}px`,
          paddingBottom: `${spacing.py * 4}px`
        }}
      >
        <div className="flex items-center justify-center">
          {/* Centered Logo and Navigation Container */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Logo */}
            <div>
              <Logo 
                size={72} 
                className="hover:scale-105 transition-transform duration-300 cursor-pointer" 
                onClick={handleLogoClick}
              />
            </div>
            
            {/* Pill-shaped Navigation Container */}
            <div 
              ref={navRef} 
              className="flex items-center bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-full px-2 py-2 shadow-lg relative"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Dynamic hover background */}
              <div
                className="absolute bg-primary-custom rounded-full transition-all duration-300 ease-out pointer-events-none"
                style={{
                  left: `${hoverPosition.x + 8}px`,
                  width: `${hoverPosition.width - 16}px`,
                  height: '36px',
                  top: '8px',
                  opacity: hoverPosition.opacity * 0.15,
                  transform: hoverPosition.opacity > 0 ? 'scale(1)' : 'scale(0.8)',
                }}
              />
              
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeNavItem === item.section;
                
                return (
                  <button
                    key={item.section}
                    onClick={() => scrollToSection(item.section)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-medium z-10 ${
                      isActive 
                        ? 'text-primary-custom bg-primary-custom/10' 
                        : 'text-gray-600 hover:text-primary-custom hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Logo and Menu with Intelligent Spacing */}
          <div className="md:hidden flex items-center justify-between w-full">
            <div className="flex-shrink-0 touch-target" style={{ minWidth: '44px', minHeight: '44px' }}>
              <Logo 
                size={getAdaptiveLogoSize()} 
                className="hover:scale-105 transition-transform duration-300 cursor-pointer" 
                onClick={handleLogoClick}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-full shadow-lg flex-shrink-0 touch-target"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu with Touch Gestures */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu */}
              <motion.div
                ref={menuRef}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 200,
                  duration: 0.3 
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onPanEnd={handlePanEnd}
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/20 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <Logo size={40} />
                    <span className="text-lg font-semibold text-gray-900">Menu</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full hover:bg-white/20 touch-target text-gray-900 hover:text-gray-700"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Navigation Items */}
                <div className="py-6">
                  {navigationItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = activeNavItem === item.section;
                    
                    return (
                      <motion.button
                        key={item.section}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          delay: index * 0.1,
                          type: "spring",
                          damping: 20,
                          stiffness: 300
                        }}
                        onClick={() => scrollToSection(item.section)}
                        className={`
                          w-full flex items-center space-x-4 px-6 py-4 text-left transition-all duration-200 touch-target
                          ${isActive 
                            ? 'bg-white/20 border-r-4 border-primary-custom text-primary-custom' 
                            : 'text-gray-900 hover:bg-white/10 hover:text-primary-custom'
                          }
                        `}
                        style={{ minHeight: '56px' }}
                      >
                        <div className={`
                          p-2 rounded-full transition-colors duration-200
                          ${isActive 
                            ? 'bg-primary-custom text-white' 
                            : 'bg-white/20 text-gray-700 group-hover:bg-primary-custom/20'
                          }
                        `}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-medium">{item.label}</span>
                        
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto w-2 h-2 bg-primary-custom rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>


              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 mx-6">
            <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 shadow-lg">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeNavItem === item.section;
                  
                  return (
                    <button
                      key={item.section}
                      onClick={() => scrollToSection(item.section)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-left ${
                        isActive 
                          ? 'text-primary-custom bg-primary-custom/10' 
                          : 'text-gray-600 hover:text-primary-custom hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
