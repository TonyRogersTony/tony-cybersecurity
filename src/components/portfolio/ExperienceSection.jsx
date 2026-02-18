import React from 'react';
import { Building2, Calendar, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { content } from '../content';
import SectionHeader from '../SectionHeader';
import ScrollReveal from '../ScrollReveal';

export default function ExperienceSection() {
  const { experience } = content;
  const experiences = experience.positions;

  return (
    <section id="experience" className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeader title={experience.title} titleHighlight={experience.titleHighlight} />
          </ScrollReveal>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <ScrollReveal key={index} delay={0.1 * index} direction="left">
                <Card className="p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderLeftColor: 'var(--accent-primary)', borderWidth: '1px', borderLeftWidth: '4px', borderStyle: 'solid' }}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{exp.role}</h3>
                    <div className="flex items-center gap-2 font-semibold mb-2" style={{ color: 'var(--accent-primary)' }}>
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                      <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                      <span className="font-normal" style={{ color: 'var(--text-tertiary)' }}>{exp.industry}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" style={{ color: 'var(--accent-secondary)' }} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" style={{ color: 'var(--accent-secondary)' }} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-1.5" style={{ color: 'var(--accent-primary)' }}>•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Early Career Summary */}
          <ScrollReveal delay={0.5} direction="up">
            <Card className="mt-8 p-6 md:p-8" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{experience.earlyCareer.title}</h3>
            <div className="grid md:grid-cols-2 gap-4" style={{ color: 'var(--text-secondary)' }}>
              {experience.earlyCareer.items.map((item, idx) => (
                <div key={idx}>
                  <strong style={{ color: idx < 2 ? 'var(--accent-primary)' : 'var(--accent-secondary)' }}>
                    {item.company} ({item.period}):
                  </strong> {item.description}
                </div>
              ))}
            </div>
          </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}