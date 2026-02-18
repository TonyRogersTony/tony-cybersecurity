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

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={portfolio.title} titleHighlight={portfolio.titleHighlight} />

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