import React, { useState } from 'react';
import { Quote, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function TestimonialsSection() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const testimonials = [
    {
      text: "Joe had an excellent technical understanding of our platforms and very often came up with excellent solutions to challenging problems.",
      fullText: "Joe had an excellent technical understanding of our platforms and very often came up with excellent solutions to challenging problems. His ability to quickly diagnose issues and implement effective solutions was invaluable to our team. Joe consistently demonstrated professionalism and technical excellence throughout our collaboration.",
      author: "Akash Shah",
      role: "Lead Product Manager",
      company: "National Grid",
      image: null
    },
    {
      text: "Joe is one of my preferred coworker and business partner, smart head and skilled programmer. He is organized, efficient, extremely competent, and has an excellent rapport with people of all ages.",
      fullText: "Joe is one of my preferred coworker and business partner, smart head and skilled programmer. He is organized, efficient, extremely competent, and has an excellent rapport with people of all ages. His technical expertise combined with his interpersonal skills made him an invaluable member of our team. I would work with Joe again without hesitation.",
      author: "Martin Waiss",
      role: "Product Manager",
      company: "A1 TV Residential Marketing",
      image: null
    },
    {
      text: "Joe has a great balance of technical skills and customer communication, enabling him to support the customer at the highest level. He just gets the job done, no fuss, no hassle, a great addition to any team.",
      fullText: "Joe has a great balance of technical skills and customer communication, enabling him to support the customer at the highest level. He just gets the job done, no fuss, no hassle, a great addition to any team. His practical approach to problem-solving and his ability to communicate complex technical concepts in simple terms made him highly effective in client-facing roles.",
      author: "Simon McCartney",
      role: "Staff Engineer, SRE",
      company: "Axon",
      image: null
    },
    {
      text: "Joe provided critical technical support and thought leadership, constantly innovating to develop robust flexible solutions. Joe is a must have on any major critical path project.",
      fullText: "Joe provided critical technical support and thought leadership, constantly innovating to develop robust flexible solutions. Joe is a must have on any major critical path project. His forward-thinking approach and dedication to excellence ensured that our projects not only met deadlines but exceeded quality expectations. Joe's contributions were instrumental to our success.",
      author: "Chris McDaid",
      role: "Software Quality Assurance Automation Engineer",
      company: null,
      image: null
    },
    {
      text: "Joe has excellent technical and management skills. He has excellent communication skills and can put his point across to both technical and non-technical people. He is tenacious and has an uncanny ability to get people to see his point of view.",
      fullText: "Joe has excellent technical and management skills. He has excellent communication skills and can put his point across to both technical and non-technical people. He is tenacious and has an uncanny ability to get people to see his point of view. These qualities, combined with his deep technical knowledge, make him a natural leader and problem solver in any technical environment.",
      author: "Cliff Dias",
      role: "Senior Solutions Architect",
      company: "Sainsbury's Tech",
      image: null
    },
    {
      text: "Joe is technically astute and a hard worker. It was a pleasure working with Joe. He was a senior member of the technical team at O2 and well respected.",
      fullText: "Joe is technically astute and a hard worker. It was a pleasure working with Joe. He was a senior member of the technical team at O2 and well respected. His leadership and technical expertise were key factors in the success of several critical projects. Joe consistently demonstrated professionalism and dedication to delivering high-quality results.",
      author: "Grant Coleman",
      role: "Senior Project Manager",
      company: "O2 (Telefónica UK)",
      image: null
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#16213e]/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Client <span className="text-purple-400">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-xl transition-all duration-300 relative border-l-2 border-l-purple-500/50 cursor-pointer hover:scale-105 bg-[#1a1a2e]/80 border border-purple-500/20"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-400/50" />
                <div className="relative z-10">
                  <p className="text-slate-300 mb-4 italic leading-relaxed line-clamp-3">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-purple-500/20 pt-4">
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                    {testimonial.company && (
                      <p className="text-sm text-purple-400">{testimonial.company}</p>
                    )}
                  </div>
                  <p className="text-xs text-purple-400 mt-3 hover:underline">Click to read full testimonial →</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Testimonial Modal */}
          <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
            <DialogContent className="max-w-2xl bg-[#1a1a2e] border border-purple-500/30">
              <DialogHeader>
                <DialogTitle className="text-2xl text-white flex items-start gap-3">
                  <Quote className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                  <span>Full Testimonial</span>
                </DialogTitle>
              </DialogHeader>
              
              {selectedTestimonial && (
                <div className="space-y-6">
                  <p className="text-lg text-slate-300 leading-relaxed italic">
                    "{selectedTestimonial.fullText}"
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-purple-500/20">
                    {selectedTestimonial.image && (
                      <img 
                        src={selectedTestimonial.image} 
                        alt={selectedTestimonial.author}
                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                      />
                    )}
                    <div>
                      <p className="font-bold text-xl text-white">{selectedTestimonial.author}</p>
                      <p className="text-slate-400">{selectedTestimonial.role}</p>
                      {selectedTestimonial.company && (
                        <p className="text-purple-400 font-medium">{selectedTestimonial.company}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}