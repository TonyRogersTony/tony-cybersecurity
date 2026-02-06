import React, { useEffect } from 'react';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import CertificationsSection from '../components/portfolio/CertificationsSection';
import TestimonialsSection from '../components/portfolio/TestimonialsSection';
import ContactSection from '../components/portfolio/ContactSection';

export default function Home() {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <HeroSection onContactClick={scrollToContact} />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <CertificationsSection />
      <TestimonialsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2026 Joe Bains. All rights reserved.</p>
          <p className="text-sm mt-2">Senior Implementation Engineer | Technical Solutions Specialist</p>
        </div>
      </footer>
    </div>
  );
}