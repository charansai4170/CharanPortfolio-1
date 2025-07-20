import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhimsicalLoader from "@/components/WhimsicalLoader";
import InteractiveGradientBackground from "@/components/InteractiveGradientBackground";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <InteractiveGradientBackground>
          <AppWithLoader />
        </InteractiveGradientBackground>
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function AppWithLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [location] = useLocation();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show loading screen on every route change
  useEffect(() => {
    setIsLoading(true);
  }, [location]);

  return (
    <>
      <WhimsicalLoader isVisible={isLoading} onComplete={handleLoadingComplete} />
      <Router />
    </>
  );
}

export default App;
