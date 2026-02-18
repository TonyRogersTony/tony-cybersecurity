import React, { useState } from 'react';
import { Quote, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { content } from '../content';
import SectionHeader from '../SectionHeader';

export default function TestimonialsSection() {
  const { testimonials } = content;
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  return (
    <section id="testimonials" className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={testimonials.title} titleHighlight={testimonials.titleHighlight} />

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.items.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-xl transition-all duration-300 relative border-l-2 cursor-pointer hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  borderColor: 'var(--border-color)', 
                  borderLeftColor: 'var(--accent-primary)',
                  borderWidth: '1px',
                  borderLeftWidth: '2px',
                  borderStyle: 'solid'
                }}
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <Quote className="absolute top-4 right-4 w-8 h-8" style={{ color: 'color-mix(in srgb, var(--accent-primary) 50%, transparent)' }} />
                <div className="relative z-10">
                  <p className="mb-4 italic leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                    "{testimonial.text}"
                  </p>
                  <div className="pt-4" style={{ borderTopColor: 'var(--border-color)', borderTopWidth: '1px', borderTopStyle: 'solid' }}>
                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{testimonial.author}</p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{testimonial.role}</p>
                    {testimonial.company && (
                      <p className="text-sm" style={{ color: 'var(--accent-primary)' }}>{testimonial.company}</p>
                    )}
                  </div>
                  <p className="text-xs mt-3 hover:underline" style={{ color: 'var(--accent-primary)' }}>{testimonials.clickText}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Testimonial Modal */}
          <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
            <DialogContent className="max-w-2xl" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-start gap-3" style={{ color: 'var(--text-primary)' }}>
                  <Quote className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: 'var(--accent-primary)' }} />
                  <span>{testimonials.modalTitle}</span>
                </DialogTitle>
              </DialogHeader>
              
              {selectedTestimonial && (
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                    "{selectedTestimonial.fullText}"
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4" style={{ borderTopColor: 'var(--border-color)', borderTopWidth: '1px', borderTopStyle: 'solid' }}>
                    {selectedTestimonial.image && (
                      <img 
                        src={selectedTestimonial.image} 
                        alt={selectedTestimonial.author}
                        className="w-16 h-16 rounded-full object-cover border-2"
                        style={{ borderColor: 'var(--accent-primary)' }}
                      />
                    )}
                    <div>
                      <p className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>{selectedTestimonial.author}</p>
                      <p style={{ color: 'var(--text-tertiary)' }}>{selectedTestimonial.role}</p>
                      {selectedTestimonial.company && (
                        <p className="font-medium" style={{ color: 'var(--accent-primary)' }}>{selectedTestimonial.company}</p>
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