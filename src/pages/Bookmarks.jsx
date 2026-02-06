import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { BookmarkX } from 'lucide-react';
import ArticleCard from '../components/blog/ArticleCard';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Bookmarks() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await base44.auth.me();
        setIsAuthenticated(!!user);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const { data: bookmarks = [], isLoading } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => base44.entities.Bookmark.list('-created_date'),
    enabled: isAuthenticated,
  });

  const { data: articles = [] } = useQuery({
    queryKey: ['bookmarked-articles', bookmarks],
    queryFn: async () => {
      if (bookmarks.length === 0) return [];
      const articlePromises = bookmarks.map(bookmark => 
        base44.entities.Article.get(bookmark.article_id).catch(() => null)
      );
      const fetchedArticles = await Promise.all(articlePromises);
      return fetchedArticles.filter(article => article !== null);
    },
    enabled: bookmarks.length > 0,
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: (bookmarkId) => base44.entities.Bookmark.delete(bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success('Bookmark removed');
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Please log in to view your bookmarks
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Bookmarks
          </motion.h1>
          <motion.p
            className="text-lg"
            style={{ color: 'var(--text-tertiary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Articles you've saved for later
          </motion.p>
        </div>

        {/* Bookmarks Grid */}
        {isLoading ? (
          <div className="text-center py-20" style={{ color: 'var(--text-tertiary)' }}>
            Loading bookmarks...
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg mb-4" style={{ color: 'var(--text-tertiary)' }}>
              No bookmarks yet. Start saving articles you want to read later!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => {
              const bookmark = bookmarks.find(b => b.article_id === article.id);
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <ArticleCard article={article} />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBookmarkMutation.mutate(bookmark.id)}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  >
                    <BookmarkX className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}