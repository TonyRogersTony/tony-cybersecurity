import React from 'react';
import { Briefcase, Award, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { content } from '../content';
import SectionHeader from '../SectionHeader';

export default function AboutSection() {
  const { about } = content;
  
  const iconMap = {
    "Technical Excellence": Briefcase,
    "Global Experience": Globe,
    "Communication": Award
  };

  const highlights = about.highlights.map(h => ({
    ...h,
    icon: iconMap[h.title]
  }));

  return (
    <section id="about" className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6">
        <article className="max-w-6xl mx-auto">
          <SectionHeader title={about.title} titleHighlight={about.titleHighlight} />

          <div className="backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-12" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
            {about.paragraphs.map((para, idx) => (
              <p key={idx} className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {para}
              </p>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)' }}>
                    <Icon className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-tertiary)' }}>{item.description}</p>
                </Card>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}