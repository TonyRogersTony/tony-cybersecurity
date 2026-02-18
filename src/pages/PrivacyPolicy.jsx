import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import ScrollReveal from '../components/ScrollReveal';
import { content } from '../components/content';

export default function PrivacyPolicy() {
  const policy = content.privacyPolicy;
  const sections = policy.sections;

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        {/* Header */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <motion.div 
              className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: 'var(--glow-1)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{
                  background: `linear-gradient(to right, var(--accent-primary), var(--accent-secondary))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {policy.title}
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  {policy.lastUpdatedPrefix} {policy.lastUpdated}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((section, idx) => (
                <ScrollReveal key={idx} delay={0.1 * (idx % 3)}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
                  >
                    <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--accent-primary)' }}>
                      {section.title}
                    </h2>
                    <p className="leading-relaxed text-base" style={{ color: 'var(--text-secondary)' }}>
                      {section.content}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}