import React from 'react';
import { Award, GraduationCap, BookOpen, Mic } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { content } from '../content';
import SectionHeader from '../SectionHeader';

export default function CertificationsSection() {
  const { certifications } = content;
  
  const iconMap = {
    "Technical Training": BookOpen,
    "Executive Communication": Mic,
    "Operating Model Design": GraduationCap,
  };

  return (
    <section id="certifications" className="py-20" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={certifications.title} titleHighlight={certifications.titleHighlight} />


          {/* Training & Leadership */}
          <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>{certifications.sections.training.title}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.sections.training.items.map((item, index) => {
              const Icon = iconMap[item.title] || Award;
              return (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)' }}>
                    <Icon className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}