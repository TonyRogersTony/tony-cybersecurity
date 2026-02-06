import React from 'react';
import { Mail, Phone, MapPin, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection({ onContactClick }) {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#16213e] to-[#1a1a2e] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8956A]/20 border border-[#B8956A]/30 rounded-full mb-8">
            <div className="w-2 h-2 bg-[#B8956A] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-[#9A7A52]">Available for Consulting</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#B8956A]">
            Joe Bains
          </h1>

          <div className="text-xl md:text-2xl text-slate-600 mb-6 font-light">
            Senior Implementation Engineer | Technical Solutions Specialist
          </div>

          <div className="text-lg text-slate-500 mb-4">
            Linux Administrator • DBA • Linux Trainer
          </div>

          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            15+ years of expertise in technical solutions delivery across telecommunications, healthcare, and enterprise environments.
          </p>

          {/* Contact info */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B8956A]" />
              <span>London, UK</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#B8956A]" />
              <a href="tel:+447834963875" className="hover:text-[#9A7A52] transition-colors">+44 7834 963875</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#B8956A]" />
              <a href="mailto:biohackerjoe@gmail.com" className="hover:text-[#9A7A52] transition-colors">biohackerjoe@gmail.com</a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button 
              onClick={onContactClick}
              size="lg"
              className="bg-[#B8956A] hover:bg-[#9A7A52] text-white px-8 shadow-lg"
            >
              Get in Touch
            </Button>
            <Button 
              onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              variant="outline"
              className="border-[#B8956A] text-[#9A7A52] hover:bg-[#B8956A] hover:text-white px-8"
            >
              View Portfolio
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-slate-500 mx-auto" />
          </div>
        </div>
      </div>

      {/* Professional status badge */}
      <div className="absolute bottom-8 right-8 text-sm text-slate-400 hidden md:block">
        British Citizen • Full UK Driving Licence • Former SC-Cleared
      </div>
    </section>
  );
}