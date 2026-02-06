import React from 'react';
import { Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "Joe had an excellent technical understanding of our platforms and very often came up with excellent solutions to challenging problems.",
      author: "Akash Shah",
      role: "Lead Product Manager at National Grid"
    },
    {
      text: "Joe is one of my preferred coworker and business partner, smart head and skilled programmer. He is organized, efficient, extremely competent, and has an excellent rapport with people of all ages.",
      author: "Martin Waiss",
      role: "Product Manager – A1 TV Residential Marketing"
    },
    {
      text: "Joe has a great balance of technical skills and customer communication, enabling him to support the customer at the highest level. He just gets the job done, no fuss, no hassle, a great addition to any team.",
      author: "Simon McCartney",
      role: "Staff Engineer, SRE at Axon"
    },
    {
      text: "Joe provided critical technical support and thought leadership, constantly innovating to develop robust flexible solutions. Joe is a must have on any major critical path project.",
      author: "Chris McDaid",
      role: "Software Quality Assurance Automation Engineer"
    },
    {
      text: "Joe has excellent technical and management skills. He has excellent communication skills and can put his point across to both technical and non-technical people. He is tenacious and has an uncanny ability to get people to see his point of view.",
      author: "Cliff Dias",
      role: "Senior Solutions Architect at Sainsbury's Tech"
    },
    {
      text: "Joe is technically astute and a hard worker. It was a pleasure working with Joe. He was a senior member of the technical team at O2 and well respected.",
      author: "Grant Coleman",
      role: "Senior Project Manager at O2 (Telefónica UK)"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Client <span className="text-[#B8956A]">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-[#B8956A] mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow relative border-l-2 border-l-[#B8956A]">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-[#E8C7A0]" />
                <div className="relative z-10">
                  <p className="text-slate-700 mb-4 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-slate-800">{testimonial.author}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}