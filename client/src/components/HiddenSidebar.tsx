import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  searchHistory: string[];
  onHistorySelect: (query: string) => void;
  onClearHistory: () => void;
}

const HiddenSidebar = ({ 
  isOpen, 
  onClose, 
  searchHistory, 
  onHistorySelect, 
  onClearHistory 
}: SidebarProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 z-50"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Search History</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* History Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {searchHistory.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500">No search history yet</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Your searches will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {searchHistory.map((query, index) => (
                    <motion.div
                      key={index}
                      className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer transition-all hover:bg-white/10 hover:border-blue-400/50 hover:transform hover:translate-x-1 hover:scale-[1.02]"
                      onClick={() => onHistorySelect(query)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {query}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {searchHistory.length > 0 && (
              <div className="p-4 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={onClearHistory}
                  className="w-full border-red-400/50 text-red-400 hover:bg-red-400/10 hover:border-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All History
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HiddenSidebar;