import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ExternalLink, Briefcase, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ScrollReveal from '../ScrollReveal';

export default function LinkedInSection() {
  const linkedInUrl = 'https://www.linkedin.com/in/joebains/';

  const stats = [
    { icon: Briefcase, label: 'Professional Network', value: 'Active' },
    { icon: Users, label: 'Connections', value: '500+' },
    { icon: TrendingUp, label: 'Profile Views', value: 'Growing' }
  ];

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
              Connect on <span style={{ color: 'var(--accent-primary)' }}>LinkedIn</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <Card 
              className="p-8 border-2 transition-all duration-300 hover:shadow-2xl"
              style={{ 
                backgroundColor: 'color-mix(in srgb, var(--bg-secondary) 80%, transparent)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-4 rounded-lg"
                    style={{ 
                      backgroundColor: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <stat.icon 
                      className="w-8 h-8 mx-auto mb-3" 
                      style={{ color: 'var(--accent-light)' }} 
                    />
                    <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center space-y-4">
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  Let's connect and explore opportunities for collaboration
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => window.open(linkedInUrl, '_blank')}
                    className="px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
                    style={{ 
                      backgroundColor: 'var(--accent-primary)',
                      color: 'white'
                    }}
                  >
                    <Linkedin className="w-5 h-5" />
                    View LinkedIn Profile
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}