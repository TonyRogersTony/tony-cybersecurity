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
    <section id="certifications" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Certifications & <span className="text-[#B8956A]">Training</span>
          </h2>
          <div className="w-20 h-1 bg-[#B8956A] mx-auto mb-12"></div>

          {/* Certifications Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-slate-800 flex items-center gap-2">
              <Award className="w-6 h-6 text-[#B8956A]" />
              Professional Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-1">{cert.name}</h4>
                      <p className="text-sm text-slate-600">{cert.issuer}</p>
                    </div>
                    <Badge variant="outline" className="border-[#B8956A] text-[#9A7A52] whitespace-nowrap">
                      {cert.year}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <Card className="mb-12 p-6 bg-[#E8C7A0]/20">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-6 h-6 text-[#B8956A] mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800">Education</h3>
                <p className="text-slate-700">
                  <strong>University of Wolverhampton</strong> — Computer Studies & Programming (1992–1995)
                </p>
              </div>
            </div>
          </Card>

          {/* Training & Leadership */}
          <h3 className="text-2xl font-semibold mb-6 text-slate-800">Training, Leadership & Media</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {training.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-[#E8C7A0]/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#B8956A]" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-slate-800">{item.title}</h4>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}