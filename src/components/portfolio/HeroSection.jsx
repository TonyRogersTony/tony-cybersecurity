import React, { useState, useEffect } from 'react';
import { MapPin, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { content } from '../content';

export default function HeroSection({ onContactClick }) {
  const { hero } = content;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)' }}>
      {/* Animated background elements with mouse tracking */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--glow-1)' }}
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02 - parallaxOffset,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--glow-2)' }}
          animate={{
            x: -mousePosition.x * 0.015,
            y: -mousePosition.y * 0.015 - parallaxOffset,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--accent-light)' }}
          animate={{
            x: mousePosition.x * 0.01 - 128,
            y: mousePosition.y * 0.01 - 128 - parallaxOffset * 0.8,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            x: { type: "spring", stiffness: 50, damping: 20 },
            y: { type: "spring", stiffness: 50, damping: 20 },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ 
              backgroundColor: 'var(--accent-primary)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Name and Profile Picture */}
          <div className="flex items-center justify-center gap-8 mb-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold"
              style={{
                background: `linear-gradient(to right, var(--accent-primary), var(--accent-secondary))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {hero.name}
            </motion.h1>
            
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: 'var(--glow-1)', opacity: 0.3 }}></div>
                <img 
                  src={hero.profileImage} 
                  alt={hero.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg border-4 relative z-10"
                  style={{ borderColor: 'var(--accent-primary)' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Status badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ 
              backgroundColor: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)',
              borderColor: 'color-mix(in srgb, var(--accent-primary) 30%, transparent)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
            <span className="text-sm font-medium" style={{ color: 'var(--accent-light)' }}>{hero.status}</span>
          </motion.div>

          <motion.div 
            className="text-xl md:text-2xl mb-6 font-light"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {hero.title}
          </motion.div>

          <motion.div 
            className="text-lg mb-4"
            style={{ color: 'var(--text-tertiary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {hero.subtitle}
          </motion.div>

          <motion.p 
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-tertiary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {hero.description}
          </motion.p>

          {/* Contact info */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            style={{ color: 'var(--text-tertiary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
              <span>{hero.location}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onContactClick}
                size="lg"
                className="text-white px-8 shadow-lg"
                style={{
                  background: `linear-gradient(to right, var(--accent-primary), var(--accent-secondary))`,
                }}
              >
                {hero.buttons.contact}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                variant="outline"
                className="px-8"
                style={{
                  borderColor: 'var(--accent-primary)',
                  color: 'var(--accent-light)',
                }}
              >
                {hero.buttons.portfolio}
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <ArrowDown className="w-6 h-6 mx-auto" style={{ color: 'var(--accent-primary)' }} />
          </motion.div>
        </div>
      </div>

      {/* Professional status badge */}
      <div className="absolute bottom-8 right-8 text-sm hidden md:block" style={{ color: 'var(--text-tertiary)' }}>
        {hero.footer}
      </div>
    </header>
  );
}