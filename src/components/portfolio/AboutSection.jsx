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
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About <span className="text-[#B8956A]">Me</span>
          </h2>
          <div className="w-20 h-1 bg-[#B8956A] mx-auto mb-12"></div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698607607cbc9a047948de01/f378d41cc_JoeBainsProfile.jpg" 
                alt="Joe Bains"
                className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-[#B8956A]"
              />
              <div className="flex-1">
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  With a dual role as a <strong className="text-[#B8956A]">Solutions & Migrations Engineer</strong> and a <strong className="text-[#D4A574]">Health Coach</strong>, my career is a testament to versatility and a dedication to empowering others through technology and wellness. I have a proven track record in streamlining deployment processes, resolving critical issues, and building strong client relationships.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  I specialize in complex system integrations, SDK/API implementations, and client onboarding. My technical acumen in Linux System Administration, combined with a commitment to biohacking and holistic health, allows me to guide clients towards both optimized technical solutions and healthier lifestyles. As an Advanced Toastmaster, I bridge the gap between deep technical knowledge and exceptional communication.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-[#B8956A]">
                  <div className="w-12 h-12 bg-[#E8C7A0]/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#B8956A]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}