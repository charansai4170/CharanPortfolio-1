import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Menu, X, Home, User, Briefcase, FolderOpen, Settings, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("home");
  const navRef = useRef<HTMLDivElement>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "experience", "projects", "skills", "contact"];
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

  const navigationItems = [
    { label: "Home", section: "home", icon: Home },
    { label: "About", section: "about", icon: User },
    { label: "Experience", section: "experience", icon: Briefcase },
    { label: "Projects", section: "projects", icon: FolderOpen },
    { label: "Skills", section: "skills", icon: Settings },
    { label: "Contact", section: "contact", icon: Mail },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          {/* Centered Logo and Navigation Container */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Logo */}
            <div>
              <Logo size={72} className="hover:scale-105 transition-transform duration-300" />
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
          
          {/* Mobile Logo and Menu */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Logo size={56} className="hover:scale-105 transition-transform duration-300" />
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-full shadow-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </Button>
          </div>
        </div>

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
