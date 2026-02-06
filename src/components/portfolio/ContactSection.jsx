import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { content } from '../content';
import SectionHeader from '../SectionHeader';
import ScrollReveal from '../ScrollReveal';

export default function ContactSection() {
  const { contact } = content;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service_interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await base44.entities.ContactSubmission.create(formData);
      toast.success(contact.form.successMessage);
      setFormData({
        name: '',
        email: '',
        company: '',
        service_interest: '',
        message: ''
      });
    } catch (error) {
      toast.error(contact.form.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'var(--glow-1)' }}></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'var(--glow-2)' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <SectionHeader title={contact.title} titleHighlight={contact.titleHighlight} />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <ScrollReveal delay={0.2} direction="left">
              <aside>
              <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>{contact.intro.title}</h3>
              <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {contact.intro.description}
              </p>

              <address className="space-y-4 not-italic">
                <Card className="p-4" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)' }}>
                      <MapPin className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{contact.contactInfo.location.label}</p>
                      <p style={{ color: 'var(--text-primary)' }}>{contact.contactInfo.location.value}</p>
                    </div>
                  </div>
                </Card>
              </address>
            </aside>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.4} direction="right">
              <Card className="p-6" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
                <div>
                  <Input
                    placeholder={contact.form.fields.name}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    aria-label="Your name"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder={contact.form.fields.email}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    aria-label="Your email"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <Input
                    placeholder={contact.form.fields.company}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    aria-label="Company name"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <Select
                    value={formData.service_interest}
                    onValueChange={(value) => setFormData({ ...formData, service_interest: value })}
                    aria-label="Service interest"
                  >
                    <SelectTrigger style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                      <SelectValue placeholder={contact.form.fields.serviceInterest} />
                    </SelectTrigger>
                    <SelectContent>
                      {contact.form.serviceOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Textarea
                    placeholder={contact.form.fields.message}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    aria-label="Your message"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white"
                  style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
                >
                  {isSubmitting ? (
                    contact.form.submitting
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {contact.form.submitButton}
                    </>
                  )}
                </Button>
              </form>
            </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}