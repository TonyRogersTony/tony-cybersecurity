import React from 'react';

export default function Layout({ children }) {
  return (
    <>
      <style>{`
        [data-theme="purple"] { --bg: linear-gradient(135deg, #0f0c29 0%, #16213e 50%, #1a1a2e 100%); }
        [data-theme="blue"] { --bg: linear-gradient(135deg, #0a192f 0%, #112240 50%, #1a1a3e 100%); }
        [data-theme="green"] { --bg: linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #0d1b2a 100%); }
        [data-theme="red"] { --bg: linear-gradient(135deg, #1a0a0a 0%, #2d1414 50%, #1a0a0a 100%); }
        [data-theme="light"] { --bg: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%); }
        [data-theme="cream"] { --bg: linear-gradient(135deg, #faf8f3 0%, #f5f1e8 50%, #faf8f3 100%); }
        
        body {
          background: var(--bg, linear-gradient(135deg, #0f0c29 0%, #16213e 50%, #1a1a2e 100%));
          min-height: 100vh;
        }
      `}</style>
      {children}
    </>
  );
}