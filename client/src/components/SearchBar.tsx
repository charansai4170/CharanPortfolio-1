import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[][];
  className?: string;
}

const SearchBar = ({ 
  onSearch, 
  placeholder = "Ask me about my work, skills, or experience...",
  suggestions,
  className = ""
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentSuggestionSet, setCurrentSuggestionSet] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Default contextual suggestions if none provided
  const defaultSuggestionSets = [
    [
      "Show me your AI and ML projects",
      "What healthcare solutions have you built?", 
      "Tell me about your AWS and cloud experience"
    ],
    [
      "Show me your Python and machine learning skills",
      "What OCR and document processing projects have you done?",
      "Tell me about your experience with vector databases"
    ],
    [
      "What cost savings have your solutions delivered?",
      "Show me projects that improved healthcare outcomes", 
      "How have you optimized business processes?"
    ],
    [
      "Show me your AWS Bedrock and Claude integrations",
      "What Docker and Kubernetes deployments have you done?",
      "Tell me about your Power BI dashboard expertise"
    ]
  ];

  const suggestionSets = suggestions || defaultSuggestionSets;
  const currentSuggestions = suggestionSets[currentSuggestionSet];

  useEffect(() => {
    if (!isTyping && searchQuery.length === 0) {
      const interval = setInterval(() => {
        setCurrentSuggestionSet(prev => (prev + 1) % suggestionSets.length);
      }, 8000); // Rotate suggestions every 8 seconds
      
      return () => clearInterval(interval);
    }
  }, [isTyping, searchQuery, suggestionSets.length]);

  const handleSuggestionClick = async (suggestion: string) => {
    setIsTyping(true);
    setSearchQuery("");
    
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Simulate human-like typing
    for (let i = 0; i <= suggestion.length; i++) {
      await new Promise(resolve => {
        const baseDelay = 80;
        const variation = Math.random() * 40 - 20;
        const char = suggestion[i - 1];
        
        let delay = baseDelay + variation;
        if (char && /[A-Z]/.test(char)) delay += 20;
        if (char && /[0-9]/.test(char)) delay += 15;
        if (char && /[!@#$%^&*()_+{}|:"<>?]/.test(char)) delay += 30;
        
        setTimeout(() => {
          setSearchQuery(suggestion.substring(0, i));
          resolve(void 0);
        }, Math.max(40, delay));
      });
    }
    
    // Brief pause before auto-submit
    setTimeout(() => {
      setIsTyping(false);
      handleSearch(suggestion);
    }, 500);
  };

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      onSearch(query.trim());
      setSearchQuery("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Suggestion Chips */}
      <AnimatePresence mode="wait">
        {!isTyping && searchQuery.length === 0 && (
          <motion.div
            key={currentSuggestionSet}
            className="mb-4 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Lightbulb className="h-4 w-4" />
              <span className="text-sm font-medium">Try asking:</span>
            </div>
            <div className="w-full flex flex-wrap justify-center gap-2">
              {currentSuggestions.map((suggestion, index) => (
                <motion.button
                  key={`${currentSuggestionSet}-${index}`}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-md hover:scale-105 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-blue-500/40 hover:to-purple-500/40 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-400/25"
                  onClick={() => handleSuggestionClick(suggestion)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Input */}
      <motion.div
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 shadow-2xl"
        animate={isTyping ? {
          boxShadow: "0 0 20px rgba(59,130,246,0.3)",
          borderColor: "rgba(59,130,246,0.5)"
        } : {}}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-transparent border-none text-white placeholder-gray-400 text-lg focus:ring-0 focus:outline-none"
            />
          </div>
          <Button
            onClick={() => handleSearch()}
            disabled={!searchQuery.trim() || isTyping}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-300 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            className="absolute bottom-2 left-6 text-blue-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="inline-flex items-center gap-1">
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SearchBar;