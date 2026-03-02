import React from 'react';
import SEO from '../components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Workflow, Radar, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Shield,
    title: 'Platform Modernisation Assessment',
    tagline: '2–3 week executive-grade review of your Palo Alto estate to surface architectural, operational, and commercial truth.',
    bullets: [
      'RAG-rated findings across NGFW, Prisma Access, Cortex, XSIAM, and Panorama/Strata Cloud Manager.',
      'Tool overlap, licence utilisation, and cost inefficiency analysis to prep renewals.',
      'Target-state architecture blueprint with a 90–180 day modernisation roadmap.',
      'Board-ready report with commercial optimisation summary and clear next steps.',
    ],
    proof: 'Typical investment: £5k–£9k (UK) | €6k–€11k (EU).',
  },
  {
    icon: Workflow,
    title: 'Modernisation Programme',
    tagline: 'Execute the roadmap and turn design into operating reality with senior-led delivery.',
    bullets: [
      'NGFW → SASE uplift and Prisma Access optimisation with identity-aligned controls.',
      'Cortex XDR rollout or tuning plus XSOAR/XSIAM onboarding and playbook alignment.',
      'SOC integration rationalisation to cut noise and sharpen response.',
      'Milestone-based governance with clear exit criteria and product specialists only when required.',
    ],
    proof: 'Typical programme value: £20k–£75k+ depending on scope.',
  },
  {
    icon: Radar,
    title: 'Ongoing Product Oversight',
    tagline: 'Retained advisory to keep the platform aligned, tuned, and commercially optimised.',
    bullets: [
      'Lifecycle and roadmap alignment across NGFW, Prisma, Cortex, and Strata Cloud Manager.',
      'Quarterly posture reviews, SOC tuning oversight, and identity-aware policy hygiene.',
      'Audit, cyber insurance, and renewal guidance grounded in measurable posture.',
      'Executive cadence without running your SOC; escalation path when deeper product owners are needed.',
    ],
    proof: 'Typical retainer: £2.5k–£6k per month.',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <SEO section="services" />
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Palo Alto Security Platform Modernisation
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Structured assessments, targeted programmes, and retained oversight to turn fragmented Palo Alto deployments into an integrated, low-noise, commercially-optimised security platform.
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
              </Card>
            );
          })}
        </section>

        <section>
          <Card className="p-8" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Why Asset Protect CyberSecurity</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-1" style={{ color: 'var(--accent-primary)' }} /><span style={{ color: 'var(--text-secondary)' }}>Platform-first approach across NGFW, Prisma Access, Cortex, XSOAR/XSIAM, and Strata Cloud Manager.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-1" style={{ color: 'var(--accent-primary)' }} /><span style={{ color: 'var(--text-secondary)' }}>Executive-grade outputs: board-ready reporting, clear roadmaps, and commercial optimisation you can defend.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-1" style={{ color: 'var(--accent-primary)' }} /><span style={{ color: 'var(--text-secondary)' }}>Senior-led delivery only; specialist product owners engaged when needed—no junior churn.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-1" style={{ color: 'var(--accent-primary)' }} /><span style={{ color: 'var(--text-secondary)' }}>Regulated sector experience with an identity-aligned, Zero Trust-as-operating-model mindset.</span></li>
            </ul>

            <Button
              onClick={() => window.dispatchEvent(new Event('open-discovery-survey'))}
              className="text-white"
              style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
            >
              Start with an assessment
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
}
