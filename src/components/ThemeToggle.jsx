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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'purple';
    setTheme(savedTheme);
    applyTheme(savedTheme);
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
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
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
  );
}