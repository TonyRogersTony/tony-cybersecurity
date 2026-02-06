import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const themes = {
  purple: {
    name: 'Purple Night',
    bg: 'from-[#0f0c29] via-[#16213e] to-[#1a1a2e]',
    accent: 'purple',
    accentDark: 'indigo',
  },
  blue: {
    name: 'Ocean Deep',
    bg: 'from-[#0a192f] via-[#112240] to-[#1a1a3e]',
    accent: 'blue',
    accentDark: 'cyan',
  },
  green: {
    name: 'Forest Night',
    bg: 'from-[#0d1b2a] via-[#1b263b] to-[#0d1b2a]',
    accent: 'emerald',
    accentDark: 'teal',
  },
  red: {
    name: 'Crimson Dark',
    bg: 'from-[#1a0a0a] via-[#2d1414] to-[#1a0a0a]',
    accent: 'rose',
    accentDark: 'red',
  },
  light: {
    name: 'Light Mode',
    bg: 'from-slate-50 via-white to-slate-100',
    accent: 'blue',
    accentDark: 'indigo',
    isLight: true,
  },
  cream: {
    name: 'Warm Cream',
    bg: 'from-[#faf8f3] via-[#f5f1e8] to-[#faf8f3]',
    accent: 'amber',
    accentDark: 'orange',
    isLight: true,
  },
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState('purple');
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const hasSeenWelcome = localStorage.getItem('hasSeenThemeWelcome');
    
    if (!hasSeenWelcome) {
      setShowWelcome(true);
      applyTheme('purple');
      setTheme('purple');
    } else {
      const themeToUse = savedTheme || 'purple';
      setTheme(themeToUse);
      applyTheme(themeToUse);
    }
  }, []);

  const applyTheme = (themeName) => {
    const themeConfig = themes[themeName];
    document.documentElement.setAttribute('data-theme', themeName);
    document.documentElement.setAttribute('data-accent', themeConfig.accent);
    document.documentElement.setAttribute('data-accent-dark', themeConfig.accentDark);
    document.documentElement.setAttribute('data-is-light', themeConfig.isLight || false);
  };

  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    localStorage.setItem('theme', themeName);
    applyTheme(themeName);
    
    if (showWelcome) {
      localStorage.setItem('hasSeenThemeWelcome', 'true');
      setShowWelcome(false);
    }
  };

  return (
    <>
      {/* Welcome Theme Selector */}
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-2xl mx-4" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', border: '1px solid' }}>
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>
              Choose Your Theme
            </h2>
            <p className="text-center mb-6" style={{ color: 'var(--text-secondary)' }}>
              Select a theme to personalize your experience
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(themes).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className="p-4 rounded-xl border-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: theme === key ? 'var(--accent-primary)' : 'var(--border-color)',
                  }}
                >
                  <div className={`w-full h-24 rounded-lg bg-gradient-to-r ${config.bg} mb-3`}></div>
                  <p className="font-medium text-center" style={{ color: 'var(--text-primary)' }}>
                    {config.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regular Theme Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
          >
            <Palette className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {Object.entries(themes).map(([key, config]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => handleThemeChange(key)}
              className={theme === key ? 'bg-accent' : ''}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${config.bg}`}></div>
                {config.name}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}