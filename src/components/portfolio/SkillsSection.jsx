import React, { useState } from 'react';
import { Cloud, Server, Database, Code, Cog, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { content } from '../content';
import SectionHeader from '../SectionHeader';
import ScrollReveal from '../ScrollReveal';

export default function SkillsSection() {
  const { skills } = content;
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const iconMap = {
    "cloud": Cloud,
    "systems": Server,
    "databases": Database,
    "languages": Code,
    "devops": Cog,
    "tools": Activity
  };

  const skillCategories = skills.categories.map(cat => ({
    ...cat,
    icon: iconMap[cat.category]
  }));



  const filteredCategories = selectedCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.category === selectedCategory);

  return (
    <section id="skills" className="py-20" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeader title={skills.title} titleHighlight={skills.titleHighlight} />
          </ScrollReveal>

          {/* Category Filters */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {skills.filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedCategory(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}
                  style={selectedCategory === filter.value
                    ? { background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', color: 'white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }
                    : { backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }
                  }
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Skills Grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            layout
          >
            {filteredCategories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={category.category}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 h-full" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)' }}>
                        <Icon className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
                      </div>
                      <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{category.title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.skills.map((skill, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{skill.name}</span>
                            <span className="text-xs font-semibold" style={{ color: 'var(--accent-primary)' }}>{skill.level}%</span>
                          </div>
                          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: idx * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}