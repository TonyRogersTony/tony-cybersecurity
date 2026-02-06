import React from 'react';

export default function Layout({ children }) {
  return (
    <>
      <style>{`
        :root {
          --color-bg: #1a1a2e;
          --color-bg-secondary: #16213e;
          --color-accent: #a855f7;
          --color-accent-secondary: #6366f1;
          --color-text: #ffffff;
        }
        body {
          background: linear-gradient(135deg, #0f0c29 0%, #16213e 50%, #1a1a2e 100%);
          min-height: 100vh;
        }
      `}</style>
      {children}
    </>
  );
}