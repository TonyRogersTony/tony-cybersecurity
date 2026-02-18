import React from 'react';
import SEO from '../components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudUpload, Bot, Route, Wrench, CheckCircle2 } from 'lucide-react';

const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/biohackinghealthcoach/30min';

const services = [
  {
    icon: CloudUpload,
    title: 'Cloud Migration & Implementation',
    tagline: 'Move your systems to the cloud securely, with zero (or minimal) downtime – and predictable costs.',
    bullets: [
      'Zero-downtime migrations to AWS, Azure, or Google Cloud (lift-and-shift, replatform, or refactor).',
      'Full assessment, planning, execution, and post-migration optimisation.',
      'Cut infrastructure costs by 30–50% while improving scalability and security.',
      'Tailored for London SMEs: UK data sovereignty, hybrid setups, and legacy system handling.',
    ],
    proof: 'Delivered complex AWS migrations for healthcare and telecom clients – now helping smaller teams achieve the same reliability.',
    cta: 'Ready to migrate? Book a free 30-min scoping call.',
  },
  {
    icon: Bot,
    title: 'AI Automation & Adoption',
    tagline: 'Implement simple, no-code AI tools to automate repetitive tasks and save 10–20 hours/week.',
    bullets: [
      'Easy wins: AI chatbots, automated invoicing/expenses, content generation, and workflow automation.',
      'Tools like ChatGPT integrations, Zapier/Make.com, Gemini, and Perplexity with UK-focused compliance in mind.',
      'Quick setup in days, not months, with practical team training included.',
      'ROI-first approach: start small, measure savings, scale what works.',
    ],
    proof: 'Recent AI certifications plus hands-on delivery helping London agencies automate admin and marketing for faster growth.',
    cta: 'Which task wastes your time most? Let’s automate it.',
  },
  {
    icon: Route,
    title: 'Digital Transformation Advisory & Roadmapping',
    tagline: 'Get a realistic, step-by-step plan to modernise operations without corporate bloat.',
    bullets: [
      'Current-state audits, pain-point analysis, and phased modernisation roadmaps.',
      'System integration, DevOps setup, and process automation with practical delivery standards.',
      'Bridge legacy systems to secure modern architectures without business disruption.',
      'Built for London SMEs: budget-aware execution, fast wins, and compliance-aware planning.',
    ],
    proof: '15+ years streamlining deployments across telecom and healthcare, now focused on helping growing businesses avoid common pitfalls.',
    cta: 'Need a clear tech roadmap? Schedule a no-obligation discovery session.',
  },
  {
    icon: Wrench,
    title: 'Technical Project Rescue & Advisory',
    tagline: 'Fix stalled implementations and optimise existing systems with senior technical support.',
    bullets: [
      'Troubleshooting and root-cause remediation for failing or delayed projects.',
      'Performance tuning and security hardening for existing platforms.',
      'Interim senior support during critical migrations and upgrades.',
      'Independent second opinions before high-risk technical decisions.',
    ],
    proof: 'Hands-on rescue support for complex delivery environments where reliability and speed both matter.',
    cta: 'Got a stuck project? Let’s unblock it quickly.',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <SEO section="services" />
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Helping London SMEs Modernise Tech Without the Headache
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Practical cloud migrations, AI automation, and digital transformation delivered with enterprise-grade reliability and SME-friendly simplicity. From someone who’s done it at O2, Vodafone, and beyond.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="p-6"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{service.title}</h2>
                </div>

                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{service.tagline}</p>

                <ul className="space-y-2 mb-4">
                  {service.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                      <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Proof:</strong> {service.proof}
                </p>

                <Button
                  onClick={() => window.open(calendlyUrl, '_blank', 'noopener,noreferrer')}
                  className="w-full text-white"
                  style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
                >
                  {service.cta}
                </Button>
              </Card>
            );
          })}
        </section>

        <section>
          <Card className="p-8" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Why Choose Me?</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-1" style={{ color: 'var(--accent-primary)' }} /><span style={{ color: 'var(--text-secondary)' }}>Big-enterprise experience (O2, Vodafone, National Grid-level projects) applied to SME budgets and timelines.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-1" style={{ color: 'var(--accent-primary)' }} /><span style={{ color: 'var(--text-secondary)' }}>Approachable, no-jargon delivery style with practical, plain-English guidance.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-1" style={{ color: 'var(--accent-primary)' }} /><span style={{ color: 'var(--text-secondary)' }}>London-based with responsive support and in-person collaboration when needed.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-1" style={{ color: 'var(--accent-primary)' }} /><span style={{ color: 'var(--text-secondary)' }}>Proven outcomes across cloud, automation, and technical delivery transformation.</span></li>
            </ul>

            <Button
              onClick={() => window.open(calendlyUrl, '_blank', 'noopener,noreferrer')}
              className="text-white"
              style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
            >
              Let’s discuss your challenges — no pressure, just honest advice.
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
}
