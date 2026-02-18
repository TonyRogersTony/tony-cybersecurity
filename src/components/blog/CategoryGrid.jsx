import React from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { BookOpen, Users, TrendingUp, FileText, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { content } from '../content';

export default function CategoryGrid({ articleCounts = {} }) {
  const iconMap = {
    book: BookOpen,
    users: Users,
    trending: TrendingUp,
    file: FileText,
    graduation: GraduationCap,
  };

  const gridContent = content.categoryGrid;
  const categories = gridContent.categories.map((category) => ({
    ...category,
    icon: iconMap[category.icon],
  }));

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
                  {count} {count !== 1 ? gridContent.articleCountLabelPlural : gridContent.articleCountLabel}
                </div>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}