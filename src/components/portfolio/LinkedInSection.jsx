import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ExternalLink, Briefcase, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ScrollReveal from '../ScrollReveal';
import { content } from '../content';

export default function LinkedInSection() {
  const linkedIn = content.linkedInSection;
  const linkedInUrl = linkedIn.linkedInUrl;
  const linkedInMessageUrl = linkedIn.linkedInMessageUrl;

  return (
    <section 
      id="linkedin" 
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--accent-primary)', opacity: 0.1 }}
        />
        <div 
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--accent-secondary)', opacity: 0.1 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-12">
            <Linkedin className="w-8 h-8" style={{ color: 'var(--accent-primary)' }} />
            <h2 className="text-4xl font-bold text-center">
              {linkedIn.headingPrefix} <span style={{ color: 'var(--accent-primary)' }}>{linkedIn.headingHighlight}</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <Card 
              className="overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl"
              style={{ 
                backgroundColor: 'color-mix(in srgb, var(--bg-secondary) 80%, transparent)',
                borderColor: 'var(--border-color)'
              }}
            >
              {/* LinkedIn-style header */}
              <div 
                className="h-32 relative"
                style={{ 
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                }}
              />
              
              {/* Profile section */}
              <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row gap-6 -mt-16 relative">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-32 h-32 rounded-full border-4 overflow-hidden"
                      style={{ borderColor: 'var(--bg-secondary)' }}
                    >
                      <img 
                        src={linkedIn.profileImage}
                        alt={linkedIn.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 pt-4">
                    <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {linkedIn.name}
                    </h3>
                    <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {linkedIn.title}
                    </p>
                    <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
                      {linkedIn.meta}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button
                          onClick={() => window.open(linkedInUrl, '_blank')}
                          className="w-full px-6 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                          style={{ 
                            backgroundColor: 'var(--accent-primary)',
                            color: 'white'
                          }}
                        >
                          <Linkedin className="w-5 h-5" />
                          {linkedIn.buttons.viewProfile}
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button
                          onClick={() => window.open(linkedInMessageUrl, '_blank')}
                          className="w-full px-6 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                          style={{ 
                            backgroundColor: 'var(--accent-secondary)',
                            color: 'white'
                          }}
                        >
                          <Linkedin className="w-5 h-5" />
                          {linkedIn.buttons.messageMe}
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}