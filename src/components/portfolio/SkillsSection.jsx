import React, { useState } from 'react';
import { Cloud, Server, Database, Code, Cog, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skillCategories = [
    {
      icon: Cloud,
      title: "Cloud & Infrastructure",
      category: "cloud",
      skills: [
        { name: "AWS Cloud", level: 90 },
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 80 },
        { name: "Terraform", level: 75 },
        { name: "VMware ESX/ESXi", level: 85 }
      ]
    },
    {
      icon: Server,
      title: "Operating Systems",
      category: "systems",
      skills: [
        { name: "Linux (RHEL/Ubuntu)", level: 95 },
        { name: "Solaris Administration", level: 85 },
        { name: "HP-UX", level: 75 },
        { name: "Windows Server", level: 80 }
      ]
    },
    {
      icon: Database,
      title: "Databases",
      category: "databases",
      skills: [
        { name: "MySQL", level: 90 },
        { name: "Oracle", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 75 }
      ]
    },
    {
      icon: Code,
      title: "Development & Scripting",
      category: "languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "Shell Scripting", level: 95 },
        { name: "JavaScript", level: 80 },
        { name: "Java", level: 75 },
        { name: "API/SDK Integration", level: 85 }
      ]
    },
    {
      icon: Cog,
      title: "DevOps & Automation",
      category: "devops",
      skills: [
        { name: "CI/CD Pipelines", level: 85 },
        { name: "Ansible", level: 80 },
        { name: "Git", level: 90 },
        { name: "Puppet", level: 75 }
      ]
    },
    {
      icon: Activity,
      title: "Monitoring & Tools",
      category: "tools",
      skills: [
        { name: "Nagios", level: 85 },
        { name: "F5 BigIP", level: 80 },
        { name: "Centreon", level: 75 },
        { name: "Jboss", level: 70 }
      ]
    }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.category === selectedCategory);

  return (
    <section id="skills" className="py-20 bg-[#0f0c29]/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Technical <span className="text-purple-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-8"></div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { label: 'All Skills', value: 'all' },
              { label: 'Cloud', value: 'cloud' },
              { label: 'Systems', value: 'systems' },
              { label: 'Databases', value: 'databases' },
              { label: 'Languages', value: 'languages' },
              { label: 'DevOps', value: 'devops' },
              { label: 'Tools', value: 'tools' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedCategory(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === filter.value
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-[#1a1a2e]/80 text-slate-300 border border-purple-500/20 hover:border-purple-500/40'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

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
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-[#1a1a2e]/80 border border-purple-500/20 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.skills.map((skill, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                            <span className="text-xs text-purple-400 font-semibold">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-[#0f0c29] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
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