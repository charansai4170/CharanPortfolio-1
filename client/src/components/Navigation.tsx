import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { label: "Home", section: "home" },
    { label: "Experience", section: "experience" },
    { label: "Skills", section: "skills" },
    { label: "Projects", section: "projects" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div
            className="text-xl font-bold gradient-text cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            Charan Thota
          </div>

          {/* Desktop Navigation */}
          <div ref={navRef} className="hidden md:flex space-x-8 relative">
            {/* Dynamic hover background */}
            <div
              className="absolute top-0 h-full nav-hover-highlight rounded-lg transition-all duration-300 ease-out pointer-events-none border border-primary-custom/20"
              style={{
                left: `${hoverPosition.x}px`,
                width: `${hoverPosition.width}px`,
                opacity: hoverPosition.opacity,
                transform: `translateY(-2px)`,
                boxShadow: hoverPosition.opacity > 0 ? '0 4px 20px rgba(37, 99, 235, 0.2), 0 0 30px rgba(37, 99, 235, 0.1)' : 'none'
              }}
            />
            
            {navigationItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollToSection(item.section)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`relative px-4 py-2 text-text hover:text-primary-custom transition-all duration-300 font-medium z-10 ${
                  activeNavItem === item.section ? 'text-primary-custom' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3 pt-4">
              {navigationItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className="text-left text-text hover:text-primary-custom transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
