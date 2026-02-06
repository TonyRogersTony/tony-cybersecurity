import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection({ onContactClick }) {
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
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#16213e] to-[#1a1a2e] text-white relative overflow-hidden">
      {/* Animated background elements with mouse tracking */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02 - parallaxOffset,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 0.015,
            y: -mousePosition.y * 0.015 - parallaxOffset,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl"
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
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
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
          {/* Status badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-purple-300">Available for Consulting</span>
          </motion.div>

          <motion.p 
            className="text-purple-300 text-lg mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hello! I Am
          </motion.p>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Joe Bains
          </motion.h1>

          <motion.div 
            className="text-xl md:text-2xl text-slate-300 mb-6 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Senior Implementation Engineer | Technical Solutions Specialist
          </motion.div>

          <motion.div 
            className="text-lg text-slate-400 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Linux Administrator • DBA • Linux Trainer
          </motion.div>

          <motion.p 
            className="text-lg md:text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            15+ years of expertise in technical solutions delivery across telecommunications, healthcare, and enterprise environments.
          </motion.p>

          {/* Contact info */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12 text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>London, UK</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-purple-400" />
              <a href="tel:+447834963875" className="hover:text-purple-300 transition-colors">+44 7834 963875</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-400" />
              <a href="mailto:biohackerjoe@gmail.com" className="hover:text-purple-300 transition-colors">biohackerjoe@gmail.com</a>
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
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 shadow-lg"
              >
                Get in Touch
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
                className="border-purple-500 text-purple-300 hover:bg-purple-500/20 hover:text-white px-8"
              >
                View Portfolio
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <ArrowDown className="w-6 h-6 text-purple-400 mx-auto" />
          </motion.div>
        </div>
      </div>

      {/* Professional status badge */}
      <div className="absolute bottom-8 right-8 text-sm text-slate-400 hidden md:block">
        British Citizen • Full UK Driving Licence • Former SC-Cleared
      </div>
    </section>
  );
}