import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ExternalLink, Briefcase, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ScrollReveal from '../ScrollReveal';

export default function LinkedInSection() {
  const linkedInUrl = 'https://www.linkedin.com/in/joebains/';
  const linkedInMessageUrl = 'https://www.linkedin.com/messaging/compose?recipient=joebains';

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
          <div className="max-w-4xl mx-auto space-y-6">
            {/* LinkedIn Profile Preview */}
            <Card 
              className="overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl"
              style={{ 
                backgroundColor: 'color-mix(in srgb, var(--bg-secondary) 80%, transparent)',
                borderColor: 'var(--border-color)'
              }}
              onClick={() => window.open(linkedInUrl, '_blank')}
            >
              <div className="relative h-96">
                <iframe
                  src={linkedInUrl}
                  className="w-full h-full"
                  title="LinkedIn Profile"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
                />
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <h3 className="text-2xl font-bold mb-2">Joe Bains</h3>
                  <p className="text-lg opacity-90">Senior Implementation Engineer | Technical Solutions Specialist</p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <Card 
              className="p-8 border-2 transition-all duration-300"
              style={{ 
                backgroundColor: 'color-mix(in srgb, var(--bg-secondary) 80%, transparent)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div className="text-center space-y-6">
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  Let's connect and explore opportunities for collaboration
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => window.open(linkedInUrl, '_blank')}
                      className="px-6 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                      style={{ 
                        backgroundColor: 'var(--accent-primary)',
                        color: 'white'
                      }}
                    >
                      <Linkedin className="w-5 h-5" />
                      View Full Profile
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => window.open(linkedInMessageUrl, '_blank')}
                      className="px-6 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                      style={{ 
                        backgroundColor: 'var(--accent-secondary)',
                        color: 'white'
                      }}
                    >
                      <Linkedin className="w-5 h-5" />
                      Message on LinkedIn
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}