import React from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { BookOpen, Users, TrendingUp, FileText, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Technical',
    icon: BookOpen,
    description: 'Deep dives into technical topics and engineering practices',
    color: 'rgb(59, 130, 246)',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))'
  },
  {
    name: 'Leadership',
    icon: Users,
    description: 'Insights on team leadership and management',
    color: 'rgb(168, 85, 247)',
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.05))'
  },
  {
    name: 'Industry Insights',
    icon: TrendingUp,
    description: 'Analysis of industry trends and developments',
    color: 'rgb(16, 185, 129)',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))'
  },
  {
    name: 'Case Studies',
    icon: FileText,
    description: 'Real-world project experiences and lessons',
    color: 'rgb(245, 158, 11)',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))'
  },
  {
    name: 'Tutorials',
    icon: GraduationCap,
    description: 'Step-by-step guides and how-to content',
    color: 'rgb(239, 68, 68)',
    gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05))'
  }
];

export default function CategoryGrid({ articleCounts = {} }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {categories.map((category, index) => {
        const Icon = category.icon;
        const count = articleCounts[category.name] || 0;

        return (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`${createPageUrl('ArticlesByCategory')}?category=${encodeURIComponent(category.name)}`}>
              <Card 
                className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ 
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  background: category.gradient
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: category.color }} />
                </div>
                
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {category.name}
                </h3>
                
                <p 
                  className="text-sm mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {category.description}
                </p>
                
                <div 
                  className="text-sm font-medium"
                  style={{ color: category.color }}
                >
                  {count} article{count !== 1 ? 's' : ''}
                </div>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}