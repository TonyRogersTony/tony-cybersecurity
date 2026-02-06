import React, { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../components/utils';

export default function ArticleDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => base44.entities.Article.get(articleId),
    enabled: !!articleId,
  });

  if (!articleId) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <p style={{ color: 'var(--text-tertiary)' }}>Article not found</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <p style={{ color: 'var(--text-tertiary)' }}>Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <p style={{ color: 'var(--text-tertiary)' }}>Article not found</p>
      </div>
    );
  }

  const publishedDate = article.published_date ? new Date(article.published_date) : new Date(article.created_date);

  return (
    <div className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <article className="container mx-auto px-6 max-w-4xl">
        {/* Back button */}
        <Link to={createPageUrl('Articles')}>
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
        </Link>

        {/* Cover Image */}
        {article.cover_image && (
          <motion.div
            className="w-full h-96 rounded-2xl overflow-hidden mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge
            className="mb-4"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)',
              color: 'var(--accent-primary)',
              borderColor: 'var(--accent-primary)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            {article.category}
          </Badge>

          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            {article.title}
          </h1>

          {article.excerpt && (
            <p
              className="text-xl mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              {article.excerpt}
            </p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b" style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(publishedDate, 'MMMM d, yyyy')}</span>
            </div>
            {article.read_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.read_time} min read</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  style={{ color: 'var(--text-tertiary)', borderColor: 'var(--border-color)' }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </motion.div>

        {/* Article Content */}
        <motion.div
          className="prose prose-lg max-w-none"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3" style={{ color: 'var(--text-primary)' }}>{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>{children}</h3>,
              p: ({ children }) => <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{children}</p>,
              ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2" style={{ color: 'var(--text-secondary)' }}>{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2" style={{ color: 'var(--text-secondary)' }}>{children}</ol>,
              li: ({ children }) => <li style={{ color: 'var(--text-secondary)' }}>{children}</li>,
              code: ({ inline, children }) => inline ? (
                <code className="px-1.5 py-0.5 rounded text-sm" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--accent-primary)' }}>
                  {children}
                </code>
              ) : (
                <code className="block p-4 rounded-lg text-sm overflow-x-auto" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                  {children}
                </code>
              ),
              pre: ({ children }) => <pre className="mb-4">{children}</pre>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 pl-4 my-4 italic" style={{ borderColor: 'var(--accent-primary)', color: 'var(--text-tertiary)' }}>
                  {children}
                </blockquote>
              ),
              a: ({ children, href }) => (
                <a href={href} className="underline hover:no-underline" style={{ color: 'var(--accent-primary)' }}>
                  {children}
                </a>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </motion.div>

        {/* Back to articles button */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <Link to={createPageUrl('Articles')}>
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}