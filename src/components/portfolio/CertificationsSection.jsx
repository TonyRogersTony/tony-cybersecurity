import React from 'react';
import { Award, GraduationCap, BookOpen, Mic } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CertificationsSection() {
  const certifications = [
    { name: "AWS Certified Cloud Practitioner (CLF-C02)", issuer: "Amazon Web Services", year: "2023" },
    { name: "Python Scripting for DevOps", issuer: "Coursera Project Network", year: "2023" },
    { name: "Linux and Bash for Data Engineering", issuer: "Duke University", year: "2023" },
    { name: "Introduction to DevOps", issuer: "IBM", year: "2023" },
    { name: "AI & Machine Learning: Text Embeddings Mastery", issuer: "Multiple", year: "2024" },
    { name: "ChatGPT Developer Program", issuer: "OpenAI", year: "2024" },
    { name: "Langchain Certification for LLM Development", issuer: "Langchain", year: "2024" },
    { name: "Focus Awards Level 3 Award in Education and Training", issuer: "AET PTLLS", year: "2020" }
  ];

  const training = [
    {
      icon: BookOpen,
      title: "Technical Training",
      description: "Specialist Linux Trainer for Learning Tree International. Designed and conducted training programs at IT Training Centres and for Vodafone's international teams."
    },
    {
      icon: Mic,
      title: "Communication & Leadership",
      description: "Advanced Member of Toastmasters International. Led confidence-building and social anxiety workshops across the UK and Switzerland."
    },
    {
      icon: GraduationCap,
      title: "Additional Expertise",
      description: "Event Management and MC, Professional Juggling Instructor, and Professional London Tour Guide. Featured at Manchester Comedy Store and educational video production."
    }
  ];

  return (
    <section id="certifications" className="py-20" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: 'var(--text-primary)' }}>
            Certifications & <span style={{ color: 'var(--accent-primary)' }}>Training</span>
          </h2>
          <div className="w-20 h-1 mx-auto mb-12" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}></div>

          {/* Certifications Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Award className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
              Professional Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
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
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Education</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  <strong>University of Wolverhampton</strong> — Computer Studies & Programming (1992–1995)
                </p>
              </div>
            </div>
          </Card>

          {/* Training & Leadership */}
          <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Training, Leadership & Media</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {training.map((item, index) => {
              const Icon = item.icon;
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