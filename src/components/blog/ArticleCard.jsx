import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function ArticleCard({ article, onEdit, onDelete, isAdmin }) {
  const publishedDate = article.published_date ? new Date(article.published_date) : new Date(article.created_date);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card 
        className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        style={{ 
          backgroundColor: 'var(--bg-primary)', 
          borderColor: 'var(--border-color)',
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
      >
        {article.cover_image && (
          <div className="w-full h-48 overflow-hidden">
            <img 
              src={article.cover_image} 
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge 
              className="mb-2"
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
            {!article.published && (
              <Badge variant="outline" className="mb-2">Draft</Badge>
            )}
          </div>
          
          <Link to={createPageUrl(`ArticleDetail?id=${article.id}`)}>
            <h3 
              className="text-xl font-bold mb-2 hover:underline cursor-pointer"
              style={{ color: 'var(--text-primary)' }}
            >
              {article.title}
            </h3>
          </Link>
          
          {article.excerpt && (
            <p className="line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>
              {article.excerpt}
            </p>
          )}
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags?.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="text-xs"
                style={{ color: 'var(--text-tertiary)', borderColor: 'var(--border-color)' }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{format(publishedDate, 'MMM d, yyyy')}</span>
              </div>
              {article.read_time && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.read_time} min</span>
                </div>
              )}
            </div>
          </div>

          {isAdmin && (
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(article)}
                className="flex-1"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(article.id)}
                className="text-red-500 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}