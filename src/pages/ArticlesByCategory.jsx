import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ArticleCard from '../components/blog/ArticleCard';
import { motion } from 'framer-motion';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

const categoryDescriptions = {
  'Technical': 'Deep dives into technical topics, architecture, and engineering practices',
  'Leadership': 'Insights on team leadership, management, and organizational growth',
  'Industry Insights': 'Analysis and perspectives on industry trends and developments',
  'Case Studies': 'Real-world project experiences and lessons learned',
  'Tutorials': 'Step-by-step guides and practical how-to content'
};

const categoryColors = {
  'Technical': { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgb(59, 130, 246)' },
  'Leadership': { bg: 'rgba(168, 85, 247, 0.1)', border: 'rgb(168, 85, 247)' },
  'Industry Insights': { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgb(16, 185, 129)' },
  'Case Studies': { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgb(245, 158, 11)' },
  'Tutorials': { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgb(239, 68, 68)' }
};

export default function ArticlesByCategory() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles', 'category', category],
    queryFn: async () => {
      const allArticles = await base44.entities.Article.filter({ published: true, category }, '-published_date');
      return allArticles;
    },
    enabled: !!category,
  });

  if (!category) {
    return (
      <div className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-6 text-center">
          <p style={{ color: 'var(--text-tertiary)' }}>Category not specified</p>
        </div>
      </div>
    );
  }

  const colorScheme = categoryColors[category] || categoryColors['Technical'];

  return (
    <div className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Back button */}
        <Link to={createPageUrl('Articles')}>
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Articles
          </Button>
        </Link>

        {/* Category Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
            style={{ 
              backgroundColor: colorScheme.bg,
              border: `2px solid ${colorScheme.border}`
            }}
          >
            <FolderOpen className="w-5 h-5" style={{ color: colorScheme.border }} />
            <span className="text-xl font-semibold" style={{ color: colorScheme.border }}>
              {category}
            </span>
          </div>

          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {category} Articles
          </h1>
          
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            {categoryDescriptions[category] || 'Explore articles in this category'}
          </p>
        </motion.div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="text-center" style={{ color: 'var(--text-tertiary)' }}>
            Loading articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg mb-4" style={{ color: 'var(--text-tertiary)' }}>
              No articles found in this category yet.
            </p>
            <Link to={createPageUrl('Articles')}>
              <Button variant="outline">Browse All Articles</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Article count */}
        {!isLoading && articles.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <p style={{ color: 'var(--text-tertiary)' }}>
              Showing {articles.length} article{articles.length !== 1 ? 's' : ''} in {category}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}