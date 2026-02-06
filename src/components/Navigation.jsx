import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { content } from './content';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = content.navigation.items;

  const scrollToSection = (href, isPage) => {
    if (isPage) {
      return; // Let Link component handle navigation
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
        style={{
          backgroundColor: isScrolled 
            ? 'color-mix(in srgb, var(--bg-primary) 95%, transparent)' 
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-color)' : 'none'
        }}
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                item.isPage ? (
                  <Link key={item.href} to={createPageUrl(item.href.replace('/', ''))}>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        color: 'var(--text-secondary)',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'color-mix(in srgb, var(--accent-primary) 10%, transparent)';
                        e.target.style.color = 'var(--accent-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {item.label}
                    </button>
                  </Link>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href, item.isPage)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'color-mix(in srgb, var(--accent-primary) 10%, transparent)';
                      e.target.style.color = 'var(--accent-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ color: 'var(--text-primary)' }}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 md:hidden"
          style={{ 
            backgroundColor: 'color-mix(in srgb, var(--bg-primary) 98%, transparent)',
            backdropFilter: 'blur(10px)',
            paddingTop: '4rem'
          }}
        >
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                item.isPage ? (
                  <Link key={item.href} to={createPageUrl(item.href.replace('/', ''))} onClick={() => setIsMobileMenuOpen(false)}>
                    <button
                      className="w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-300"
                      style={{
                        color: 'var(--text-primary)',
                        backgroundColor: 'color-mix(in srgb, var(--accent-primary) 5%, transparent)',
                        borderLeft: '3px solid var(--accent-primary)'
                      }}
                    >
                      {item.label}
                    </button>
                  </Link>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href, item.isPage)}
                    className="px-4 py-3 rounded-lg text-left font-medium transition-all duration-300"
                    style={{
                      color: 'var(--text-primary)',
                      backgroundColor: 'color-mix(in srgb, var(--accent-primary) 5%, transparent)',
                      borderLeft: '3px solid var(--accent-primary)'
                    }}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}