import { useState, useCallback } from "react";
import { useLocation } from "wouter";

interface PageTransitionState {
  isTransitioning: boolean;
  fromPage: string;
  toPage: string;
}

const usePageTransition = () => {
  const [, setLocation] = useLocation();
  const [transitionState, setTransitionState] = useState<PageTransitionState>({
    isTransitioning: false,
    fromPage: "",
    toPage: ""
  });

  const navigateWithTransition = useCallback((
    toPath: string, 
    fromPageName?: string, 
    toPageName?: string
  ) => {
    // Get current path to determine from page
    const currentPath = window.location.pathname;
    const currentPageName = fromPageName || getPageNameFromPath(currentPath);
    const targetPageName = toPageName || getPageNameFromPath(toPath);

    // Start transition
    setTransitionState({
      isTransitioning: true,
      fromPage: currentPageName,
      toPage: targetPageName
    });

    // Complete navigation after transition
    setTimeout(() => {
      setLocation(toPath);
      
      // End transition after a short delay
      setTimeout(() => {
        setTransitionState({
          isTransitioning: false,
          fromPage: "",
          toPage: ""
        });
      }, 200);
    }, 1000); // Duration matches LogoTransition animation
  }, [setLocation]);

  const getPageNameFromPath = (path: string): string => {
    const pageMap: Record<string, string> = {
      '/': 'Home',
      '/legacy': 'Legacy Portfolio',
      '/about': 'About',
      '/projects': 'Projects',
      '/skills': 'Skills',
      '/experience': 'Experience',
      '/contact': 'Contact'
    };
    
    return pageMap[path] || 'Page';
  };

  return {
    ...transitionState,
    navigateWithTransition
  };
};

export default usePageTransition;