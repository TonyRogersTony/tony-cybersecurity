import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { name: 'Purple', value: 'purple', gradient: 'from-purple-600 to-indigo-600' },
  { name: 'Ocean', value: 'blue', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Forest', value: 'green', gradient: 'from-green-500 to-teal-500' },
  { name: 'Crimson', value: 'red', gradient: 'from-red-600 to-pink-500' },
  { name: 'Light', value: 'light', gradient: 'from-slate-200 to-slate-300' },
  { name: 'Cream', value: 'cream', gradient: 'from-amber-100 to-orange-200' }
];

export default function ThemeMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('purple');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'purple';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-30">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -140, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -140, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="rounded-r-xl shadow-lg p-3 backdrop-blur-sm"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--bg-secondary) 95%, transparent)',
              borderRight: '2px solid var(--border-color)',
              borderTop: '2px solid var(--border-color)',
              borderBottom: '2px solid var(--border-color)',
              minHeight: 'auto',
              width: '130px'
            }}
          >
            <div className="flex items-center justify-center mb-3">
              <Palette className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
            </div>

            <div className="space-y-1">
              {themes.map((theme) => (
                <motion.button
                  key={theme.value}
                  onClick={() => handleThemeChange(theme.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={theme.name}
                  className="w-full px-2 py-2 rounded-md text-left transition-all duration-200 text-xs font-medium flex items-center gap-2"
                  style={{
                    backgroundColor: currentTheme === theme.value 
                      ? 'color-mix(in srgb, var(--accent-primary) 20%, transparent)'
                      : 'color-mix(in srgb, var(--bg-primary) 50%, transparent)',
                    borderLeft: currentTheme === theme.value 
                      ? '2px solid var(--accent-primary)'
                      : '2px solid transparent',
                    color: currentTheme === theme.value ? 'var(--accent-light)' : 'var(--text-secondary)',
                    paddingLeft: currentTheme === theme.value ? '6px' : '8px'
                  }}
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.gradient} flex-shrink-0`}></div>
                  <span className="hidden sm:inline">{theme.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all"
        style={{
          backgroundColor: 'var(--accent-primary)',
          color: 'white'
        }}
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </motion.button>
    </div>
  );
}