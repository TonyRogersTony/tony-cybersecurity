import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { apiClient } from '@/api/client';
import { toast } from 'sonner';
import { content } from '../content';

export default function ArticleForm({ article, onSuccess, onCancel }) {
  const formContent = content.articleForm;
  const categories = content.articlesPage.categories;
  const defaultCategory = categories[0] || 'Technical';
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: '',
    category: defaultCategory,
    tags: [],
    published: false,
    cover_image: '',
    read_time: 5
  });
  
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        slug: article.slug || '',
        content: article.content || '',
        excerpt: article.excerpt || '',
        author: article.author || '',
        category: article.category || defaultCategory,
        tags: article.tags || [],
        published: article.published || false,
        cover_image: article.cover_image || '',
        read_time: article.read_time || 5
      });
    }
  }, [article]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async (e, publish = false) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        ...formData,
        published: publish,
        published_date: publish ? new Date().toISOString() : formData.published_date
      };

      if (article?.id) {
        await apiClient.entities.Article.update(article.id, dataToSubmit);
        toast.success(publish ? formContent.messages.published : formContent.messages.updated);
      } else {
        await apiClient.entities.Article.create(dataToSubmit);
        toast.success(publish ? formContent.messages.published : formContent.messages.savedDraft);
      }
      
      onSuccess();
    } catch (error) {
      toast.error(formContent.messages.saveFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
      <CardHeader>
        <CardTitle style={{ color: 'var(--text-primary)' }}>
          {article ? formContent.titleEdit : formContent.titleNew}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              {formContent.labels.title}
            </label>
            <Input
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder={formContent.placeholders.title}
              required
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              {formContent.labels.slug}
            </label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder={formContent.placeholders.slug}
              required
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              {formContent.labels.author}
            </label>
            <Input
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder={formContent.placeholders.author}
              required
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                {formContent.labels.category}
              </label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                {formContent.labels.readTime}
              </label>
              <Input
                type="number"
                value={formData.read_time}
                onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
                min="1"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              {formContent.labels.coverImage}
            </label>
            <Input
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              placeholder={formContent.placeholders.coverImage}
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              {formContent.labels.excerpt}
            </label>
            <Textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder={formContent.placeholders.excerpt}
              rows={3}
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              {formContent.labels.tags}
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder={formContent.placeholders.tag}
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
              <Button type="button" onClick={addTag} variant="outline">{formContent.buttons.addTag}</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge 
                  key={index}
                  className="flex items-center gap-1"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)', color: 'var(--accent-primary)' }}
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              {formContent.labels.content}
            </label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder={formContent.placeholders.content}
              rows={15}
              required
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {formContent.buttons.cancel}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={(e) => handleSubmit(e, false)}
              disabled={isSubmitting}
            >
              {isSubmitting ? formContent.buttons.saving : formContent.buttons.saveDraft}
            </Button>
            <Button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isSubmitting}
              className="text-white"
              style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
            >
              {isSubmitting ? formContent.buttons.publishing : formContent.buttons.publish}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}