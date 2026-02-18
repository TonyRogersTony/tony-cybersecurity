import React from 'react';
import { Award, GraduationCap, BookOpen, Mic } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { content } from '../content';
import SectionHeader from '../SectionHeader';

export default function CertificationsSection() {
  const { certifications } = content;
  
  const iconMap = {
    "Technical Training": BookOpen,
    "Communication & Leadership": Mic,
    "Additional Expertise": GraduationCap
  };

  return (
    <section id="certifications" className="py-20" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={certifications.title} titleHighlight={certifications.titleHighlight} />

          {/* Certifications Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Award className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
              {certifications.sections.certifications.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.sections.certifications.items.map((cert, index) => (
                <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{cert.name}</h4>
                      <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{cert.issuer}</p>
                    </div>
                    <Badge variant="outline" className="whitespace-nowrap" style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-light)' }}>
                      {cert.year}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <Card className="mb-12 p-6" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
            <div className="flex items-start gap-3">
              <GraduationCap className="w-6 h-6 mt-1" style={{ color: 'var(--accent-primary)' }} />
              <div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{certifications.sections.education.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  <strong>{certifications.sections.education.institution}</strong> — {certifications.sections.education.field} ({certifications.sections.education.period})
                </p>
              </div>
            </div>
          </Card>

          {/* Training & Leadership */}
          <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>{certifications.sections.training.title}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.sections.training.items.map((item, index) => {
              const Icon = iconMap[item.title];
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