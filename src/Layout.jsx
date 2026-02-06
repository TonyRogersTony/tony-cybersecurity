import React from 'react';

export default function Layout({ children }) {
  return (
    <>
      <style>{`
        :root {
          --color-primary: #B8956A;
          --color-primary-dark: #9A7A52;
          --color-secondary: #D4A574;
          --color-accent: #E8C7A0;
        }
      `}</style>
      {children}
    </>
  );
}