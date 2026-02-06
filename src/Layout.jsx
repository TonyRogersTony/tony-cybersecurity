import React from 'react';
import Navigation from './components/Navigation';

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <style>{`
        /* Purple Night Theme */
        [data-theme="purple"] {
          --bg-gradient: linear-gradient(135deg, #0f0c29 0%, #16213e 50%, #1a1a2e 100%);
          --bg-primary: #1a1a2e;
          --bg-secondary: #16213e;
          --bg-tertiary: #0f0c29;
          --accent-primary: #a855f7;
          --accent-secondary: #6366f1;
          --accent-light: #c084fc;
          --text-primary: #ffffff;
          --text-secondary: #cbd5e1;
          --text-tertiary: #94a3b8;
          --border-color: rgba(168, 85, 247, 0.2);
          --glow-1: #a855f7;
          --glow-2: #6366f1;
        }
        
        /* Ocean Deep Theme */
        [data-theme="blue"] {
          --bg-gradient: linear-gradient(135deg, #0a192f 0%, #112240 50%, #1a1a3e 100%);
          --bg-primary: #1a1a3e;
          --bg-secondary: #112240;
          --bg-tertiary: #0a192f;
          --accent-primary: #3b82f6;
          --accent-secondary: #06b6d4;
          --accent-light: #60a5fa;
          --text-primary: #ffffff;
          --text-secondary: #cbd5e1;
          --text-tertiary: #94a3b8;
          --border-color: rgba(59, 130, 246, 0.2);
          --glow-1: #3b82f6;
          --glow-2: #06b6d4;
        }
        
        /* Forest Night Theme */
        [data-theme="green"] {
          --bg-gradient: linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #0d1b2a 100%);
          --bg-primary: #0d1b2a;
          --bg-secondary: #1b263b;
          --bg-tertiary: #0d1b2a;
          --accent-primary: #10b981;
          --accent-secondary: #14b8a6;
          --accent-light: #34d399;
          --text-primary: #ffffff;
          --text-secondary: #cbd5e1;
          --text-tertiary: #94a3b8;
          --border-color: rgba(16, 185, 129, 0.2);
          --glow-1: #10b981;
          --glow-2: #14b8a6;
        }
        
        /* Crimson Dark Theme */
        [data-theme="red"] {
          --bg-gradient: linear-gradient(135deg, #1a0a0a 0%, #2d1414 50%, #1a0a0a 100%);
          --bg-primary: #1a0a0a;
          --bg-secondary: #2d1414;
          --bg-tertiary: #1a0a0a;
          --accent-primary: #f43f5e;
          --accent-secondary: #ef4444;
          --accent-light: #fb7185;
          --text-primary: #ffffff;
          --text-secondary: #cbd5e1;
          --text-tertiary: #94a3b8;
          --border-color: rgba(244, 63, 94, 0.2);
          --glow-1: #f43f5e;
          --glow-2: #ef4444;
        }
        
        /* Light Mode Theme */
        [data-theme="light"] {
          --bg-gradient: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%);
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --bg-tertiary: #f1f5f9;
          --accent-primary: #3b82f6;
          --accent-secondary: #6366f1;
          --accent-light: #60a5fa;
          --text-primary: #0f172a;
          --text-secondary: #475569;
          --text-tertiary: #64748b;
          --border-color: rgba(59, 130, 246, 0.2);
          --glow-1: #3b82f6;
          --glow-2: #6366f1;
        }
        
        /* Warm Cream Theme */
        [data-theme="cream"] {
          --bg-gradient: linear-gradient(135deg, #faf8f3 0%, #f5f1e8 50%, #faf8f3 100%);
          --bg-primary: #f5f1e8;
          --bg-secondary: #faf8f3;
          --bg-tertiary: #f0ebe0;
          --accent-primary: #f59e0b;
          --accent-secondary: #f97316;
          --accent-light: #fbbf24;
          --text-primary: #1c1917;
          --text-secondary: #57534e;
          --text-tertiary: #78716c;
          --border-color: rgba(245, 158, 11, 0.2);
          --glow-1: #f59e0b;
          --glow-2: #f97316;
        }
        
        body {
          background: var(--bg-gradient);
          color: var(--text-primary);
          min-height: 100vh;
          transition: background 0.3s ease, color 0.3s ease;
        }
        
        * {
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }
      `}</style>
      {children}
    </>
  );
}