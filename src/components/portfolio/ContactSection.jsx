import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function ContactSection() {
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
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        service_interest: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#E8C7A0]/30 text-slate-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#B8956A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#D4A574] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Get in <span className="text-[#B8956A]">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-[#B8956A] mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-[#9A7A52]">Let's Work Together</h3>
              <p className="text-slate-700 mb-8 leading-relaxed">
                I'm available for consulting projects, technical training, and health coaching. Whether you need expertise in cloud migrations, system integrations, or wellness programs, I'd love to hear from you.
              </p>

              <div className="space-y-4">
                <Card className="p-4 bg-white border-[#B8956A]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E8C7A0]/30 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#B8956A]" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <a href="mailto:biohackerjoe@gmail.com" className="text-[#9A7A52] hover:text-[#B8956A] transition-colors">
                        biohackerjoe@gmail.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white border-[#B8956A]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E8C7A0]/30 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#B8956A]" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <a href="tel:+447834963875" className="text-[#9A7A52] hover:text-[#B8956A] transition-colors">
                        +44 7834 963875
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white border-[#B8956A]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E8C7A0]/30 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#B8956A]" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="text-[#9A7A52]">London, United Kingdom</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-6 bg-white border-[#B8956A]/20">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="border-[#B8956A]/30 focus:border-[#B8956A]"
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="border-[#B8956A]/30 focus:border-[#B8956A]"
                  />
                </div>

                <div>
                  <Input
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="border-[#B8956A]/30 focus:border-[#B8956A]"
                  />
                </div>

                <div>
                  <Select
                    value={formData.service_interest}
                    onValueChange={(value) => setFormData({ ...formData, service_interest: value })}
                  >
                    <SelectTrigger className="border-[#B8956A]/30">
                      <SelectValue placeholder="Service Interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical_consulting">Technical Consulting</SelectItem>
                      <SelectItem value="health_coaching">Health Coaching</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="general_inquiry">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Textarea
                    placeholder="Your Message *"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="border-[#B8956A]/30 focus:border-[#B8956A]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#B8956A] hover:bg-[#9A7A52] text-white"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}