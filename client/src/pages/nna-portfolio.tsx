import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoAnimation from "@/components/LogoAnimation";
import NNAHeader from "@/components/NNAHeader";
import HiddenSidebar from "@/components/HiddenSidebar";
import IntelligentSearch from "@/components/IntelligentSearch";
import DynamicContentCanvas from "@/components/DynamicContentCanvas";

const NNAPortfolio = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [contentType, setContentType] = useState<'skills' | 'projects' | 'experience' | 'about' | 'contact' | 'general'>('general');

  // Query processing to determine content type
  const parseIntent = (query: string): typeof contentType => {
    const intents = {
      skills: /\b(skills?|technologies?|tech|stack|tools?|languages?|frameworks?|programming|coding|software|development)\b/i,
      projects: /\b(projects?|portfolio|work|built|created|developed|applications?|apps?|systems?)\b/i,
      experience: /\b(experience|career|job|work|background|history|employment|professional|resume)\b/i,
      about: /\b(about|who|story|background|personal|bio|myself|introduction)\b/i,
      contact: /\b(contact|hire|reach|email|phone|message|collaboration|connect|touch)\b/i
    };
    
    for (let [type, pattern] of Object.entries(intents)) {
      if (pattern.test(query)) return type as typeof contentType;
    }
    return 'general';
  };

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    setContentType(parseIntent(query));
  };

  const handleAddToHistory = (query: string) => {
    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(q => q !== query)];
      return newHistory.slice(0, 10); // Keep last 10 searches
    });
  };

  const handleHistorySelect = (query: string) => {
    handleSearch(query);
    setSidebarOpen(false);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleLogoComplete = () => {
    setTimeout(() => setShowLogo(false), 500);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Logo Animation */}
      <AnimatePresence>
        {showLogo && <LogoAnimation onComplete={handleLogoComplete} />}
      </AnimatePresence>

      {/* Main Portfolio Interface */}
      <AnimatePresence>
        {!showLogo && (
          <motion.div
            className="min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <NNAHeader
              onMenuClick={() => setSidebarOpen(true)}
              darkMode={darkMode}
              onThemeToggle={() => setDarkMode(!darkMode)}
            />

            {/* Hidden Sidebar */}
            <HiddenSidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              searchHistory={searchHistory}
              onHistorySelect={handleHistorySelect}
              onClearHistory={handleClearHistory}
            />

            {/* Dynamic Content Canvas */}
            <DynamicContentCanvas
              query={currentQuery}
              contentType={contentType}
            />

            {/* Intelligent Search Interface */}
            <IntelligentSearch
              onSearch={handleSearch}
              onAddToHistory={handleAddToHistory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NNAPortfolio;