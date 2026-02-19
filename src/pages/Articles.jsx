import React, { useState, useEffect } from 'react';
import { apiClient } from '@/api/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import ArticleCard from '../components/blog/ArticleCard';
import ArticleForm from '../components/blog/ArticleForm';
import CategoryGrid from '../components/blog/CategoryGrid';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { content } from '../components/content';

export default function Articles() {
  const pageContent = content.articlesPage;
  const isLocalhost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const articlesPerPage = 9;
  const canManageArticles = isAdmin && isLocalhost;

  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await apiClient.auth.me();
        setIsAdmin(user?.role === 'admin');
      } catch (error) {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const allArticles = await apiClient.entities.Article.list('-published_date');
      return canManageArticles ? allArticles : allArticles.filter(a => a.published);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.entities.Article.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast.success(pageContent.articleDeleted);
    },
  });

  const handleEdit = (article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(pageContent.deleteConfirm)) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingArticle(null);
    queryClient.invalidateQueries({ queryKey: ['articles'] });
  };

  // Calculate article counts per category
  const articleCounts = articles.reduce((acc, article) => {
    if (article.published || canManageArticles) {
      acc[article.category] = (acc[article.category] || 0) + 1;
    }
    return acc;
  }, {});

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const categories = pageContent.categories;

  if (showForm) {
    return (
      <div className="min-h-screen py-20 px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container mx-auto max-w-4xl">
          <ArticleForm
            article={editingArticle}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false);
              setEditingArticle(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {pageContent.title}
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-tertiary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {pageContent.subtitle}
          </motion.p>
        </div>

        {/* Category Grid */}
        <CategoryGrid articleCounts={articleCounts} />

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={pageContent.searchPlaceholder}
              className="pl-10"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              <SelectValue placeholder={pageContent.allCategories} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{pageContent.allCategories}</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {canManageArticles && (
            <Button
              onClick={() => setShowForm(true)}
              className="text-white whitespace-nowrap"
              style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
            >
              <Plus className="w-4 h-4 mr-2" />
              {pageContent.newArticle}
            </Button>
          )}
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="text-center py-20" style={{ color: 'var(--text-tertiary)' }}>
            {pageContent.loading}
          </div>
        ) : paginatedArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
              {pageContent.empty}
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <AnimatePresence>
                {paginatedArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isAdmin={canManageArticles}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  {pageContent.pagination.previous}
                </Button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                      className="w-10"
                      style={currentPage === i + 1 ? {
                        background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
                        color: 'white'
                      } : {}}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  {pageContent.pagination.next}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}