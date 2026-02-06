import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import ScrollReveal from '../components/ScrollReveal';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Introduction",
      content: "This Privacy Policy explains how I collect, use, and protect your personal information when you visit this website and submit contact forms. I am committed to protecting your privacy and ensuring transparency about how your data is handled."
    },
    {
      title: "2. Information I Collect",
      content: "When you submit a contact form on this website, I collect the following information: your name, email address, company name (optional), service interest, and message content. This information is collected solely for the purpose of responding to your inquiry."
    },
    {
      title: "3. How I Use Your Information",
      content: "Your information is used only to: respond to your contact inquiry, provide relevant services or information, and improve my services based on feedback. I will not use your information for marketing purposes without your explicit consent."
    },
    {
      title: "4. Data Storage & Security",
      content: "Your submitted information is stored securely in a database managed by Base44. I use industry-standard security measures to protect your data from unauthorized access, alteration, or deletion. However, no online transmission is completely secure, and I cannot guarantee absolute security."
    },
    {
      title: "5. Data Retention",
      content: "Contact form submissions are retained for as long as necessary to respond to your inquiry and maintain business records. You can request deletion of your personal information at any time by contacting me directly."
    },
    {
      title: "6. Third-Party Services",
      content: "This website uses GitHub API to display my public GitHub profile and repositories. GitHub is a third party, and their privacy policy applies to any data collected through their services. I do not share your contact form data with third parties."
    },
    {
      title: "7. Cookies",
      content: "This website may use cookies to enhance your browsing experience. These are used only for technical functionality and preference storage. You can disable cookies in your browser settings if you prefer."
    },
    {
      title: "8. Your Rights",
      content: "You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact me directly via the contact form or email."
    },
    {
      title: "9. Changes to This Policy",
      content: "I may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Your continued use of this website constitutes your acceptance of the updated Privacy Policy."
    },
    {
      title: "10. Contact",
      content: "If you have any questions about this Privacy Policy or your personal information, please contact me through the contact form on this website."
    }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        {/* Header */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <motion.div 
              className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: 'var(--glow-1)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{
                  background: `linear-gradient(to right, var(--accent-primary), var(--accent-secondary))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Privacy Policy
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  Last updated: February 2026
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((section, idx) => (
                <ScrollReveal key={idx} delay={0.1 * (idx % 3)}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
                  >
                    <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--accent-primary)' }}>
                      {section.title}
                    </h2>
                    <p className="leading-relaxed text-base" style={{ color: 'var(--text-secondary)' }}>
                      {section.content}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}