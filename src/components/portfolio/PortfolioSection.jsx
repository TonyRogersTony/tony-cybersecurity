import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../content';
import SectionHeader from '../SectionHeader';

export default function PortfolioSection() {
  const { portfolio } = content;
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = portfolio.projects;
  const categories = portfolio.categories;

  const oldProjects = [
    {
      title: "Healthcare Systems Migration",
      category: "Cloud Infrastructure",
      description: "Architected and executed complete cloud migration for healthcare facility, ensuring HIPAA compliance and zero downtime during transition.",
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
      highlights: ["Zero downtime migration", "HIPAA compliant", "Cost reduction by 40%"]
    },
    {
      title: "Video Conferencing Platform",
      category: "System Integration",
      description: "Implemented and optimized Vidyo video conferencing system for Swisscom, supporting high-profile international events.",
      technologies: ["Linux", "MySQL", "Nagios", "Python"],
      highlights: ["Supported OECD Meeting", "Custom monitoring", "Database optimization"]
    },
    {
      title: "OpenStack Cloud Infrastructure",
      category: "Cloud Infrastructure",
      description: "Contributed to detailed design and implementation of OpenStack cloud infrastructure across three data centres in Switzerland.",
      technologies: ["OpenStack", "Puppet", "Linux", "Storage SAN/NAS"],
      highlights: ["Multi-datacenter", "Automated provisioning", "High availability"]
    },
    {
      title: "CI/CD Pipeline Implementation",
      category: "Automation",
      description: "Designed and implemented continuous integration and deployment pipeline for broadcast platform, streamlining build and release processes.",
      technologies: ["Jenkins", "Git", "Docker", "Shell Scripting"],
      highlights: ["Automated deployments", "Reduced build time by 60%", "Zero-touch releases"]
    },
    {
      title: "Global Payment Gateway",
      category: "System Integration",
      description: "Led deployment and integration of payment solutions for Vodafone's global network, handling millions of transactions.",
      technologies: ["Oracle", "Java", "WebSphere MQ", "Linux"],
      highlights: ["Multi-country rollout", "24/7 uptime", "Transaction optimization"]
    },
    {
      title: "Infrastructure Monitoring System",
      category: "Automation",
      description: "Implemented comprehensive monitoring solution using Nagios and Centreon, providing real-time visibility across 300+ servers.",
      technologies: ["Nagios", "Centreon", "Python", "MySQL"],
      highlights: ["300+ servers monitored", "Custom plugins", "Predictive alerting"]
    },
    {
      title: "Python DevOps Automation",
      category: "Automation",
      description: "Developed Python-based automation tools for deployment processes, configuration management, and infrastructure provisioning.",
      technologies: ["Python", "Ansible", "Docker", "AWS"],
      highlights: ["Reduced manual tasks by 80%", "Self-service deployments", "Cost tracking"]
    },
    {
      title: "Database Performance Optimization",
      category: "System Integration",
      description: "Performed comprehensive database optimization for enterprise systems, achieving significant performance improvements.",
      technologies: ["Oracle", "MySQL", "Performance Tuning", "Shell Scripting"],
      highlights: ["Query optimization", "Index restructuring", "50% faster response times"]
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: 'var(--text-primary)' }}>
            {portfolio.title} <span style={{ color: 'var(--accent-primary)' }}>{portfolio.titleHighlight}</span>
          </h2>
          <div className="w-20 h-1 mx-auto mb-8" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}></div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
                style={selectedCategory === category.value
                  ? { background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', color: 'white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', transform: 'scale(1.05)' }
                  : { backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }
                }
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
                      <Badge style={{ background: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)', color: 'var(--accent-light)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                        {project.category}
                      </Badge>
                    </div>

                    <p className="mb-4 flex-grow" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded"
                            style={{ background: 'color-mix(in srgb, var(--accent-secondary) 10%, transparent)', color: 'var(--accent-light)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                          <span className="mt-0.5" style={{ color: 'var(--accent-primary)' }}>✓</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Results count */}
          <div className="text-center mt-8">
            <p style={{ color: 'var(--text-tertiary)' }}>
              {portfolio.resultText.showing} <span className="font-semibold" style={{ color: 'var(--accent-primary)' }}>{filteredProjects.length}</span> {filteredProjects.length === 1 ? portfolio.resultText.project : portfolio.resultText.projects}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}