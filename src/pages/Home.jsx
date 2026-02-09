import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import PortfolioSection from '../components/portfolio/PortfolioSection';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import CertificationsSection from '../components/portfolio/CertificationsSection';
import TestimonialsSection from '../components/portfolio/TestimonialsSection';
import LinkedInSection from '../components/portfolio/LinkedInSection';
import ContactSection from '../components/portfolio/ContactSection';
import SEO from '../components/SEO';
import { content } from '../components/content';

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
    <HelmetProvider>
      <>
        <SEO />
        <div className="min-h-screen">
          <Navigation />
          
          <HeroSection onContactClick={scrollToContact} />
          <AboutSection />
          <SkillsSection />
          <PortfolioSection />
          <ExperienceSection />
          <CertificationsSection />
          <TestimonialsSection />
          <LinkedInSection />
          <ContactSection />
        </div>
      </>
    </HelmetProvider>
  );
}