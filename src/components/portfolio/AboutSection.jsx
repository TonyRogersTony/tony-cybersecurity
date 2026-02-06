import React from 'react';
import { Briefcase, Heart, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function AboutSection() {
  const highlights = [
    {
      icon: Briefcase,
      title: "Technical Excellence",
      description: "Complex system integrations, SDK/API implementations, and streamlined deployment processes"
    },
    {
      icon: Heart,
      title: "Wellness Focus",
      description: "Certified health coach combining biohacking and holistic health with technical expertise"
    },
    {
      icon: Award,
      title: "Communication",
      description: "Advanced Toastmaster bridging deep technical knowledge with exceptional communication"
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#16213e]/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            About <span className="text-purple-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-12"></div>

          <div className="bg-[#1a1a2e]/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              With a dual role as a <strong className="text-purple-400">Solutions & Migrations Engineer</strong> and a <strong className="text-indigo-400">Health Coach</strong>, my career is a testament to versatility and a dedication to empowering others through technology and wellness. I have a proven track record in streamlining deployment processes, resolving critical issues, and building strong client relationships.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              I specialize in complex system integrations, SDK/API implementations, and client onboarding. My technical acumen in Linux System Administration, combined with a commitment to biohacking and holistic health, allows me to guide clients towards both optimized technical solutions and healthier lifestyles. As an Advanced Toastmaster, I bridge the gap between deep technical knowledge and exceptional communication.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-[#1a1a2e]/80 border border-purple-500/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}