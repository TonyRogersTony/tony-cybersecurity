import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/api/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bookmark, BookmarkCheck, Type, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { content } from '../content';

export default function ArticleReadingControls({ articleId, onFontSizeChange, onReadingModeChange }) {
  const readingContent = content.articleReadingControls;
  const [fontSize, setFontSize] = useState('medium');
  const [readingMode, setReadingMode] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await apiClient.auth.me();
        setIsAuthenticated(!!user);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();

    // Load preferences from localStorage
    const savedFontSize = localStorage.getItem('article-font-size') || 'medium';
    const savedReadingMode = localStorage.getItem('article-reading-mode') || 'light';
    setFontSize(savedFontSize);
    setReadingMode(savedReadingMode);
    onFontSizeChange?.(savedFontSize);
    onReadingModeChange?.(savedReadingMode);
  }, []);

  // Check if article is bookmarked
  const { data: bookmarks = [] } = useQuery({
    queryKey: ['bookmarks', articleId],
    queryFn: async () => {
      if (!isAuthenticated) return [];
      return await apiClient.entities.Bookmark.filter({ article_id: articleId });
    },
    enabled: isAuthenticated && !!articleId,
  });

  const isBookmarked = bookmarks.length > 0;

  // Bookmark mutations
  const addBookmarkMutation = useMutation({
    mutationFn: () => apiClient.entities.Bookmark.create({ article_id: articleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success(readingContent.messages.bookmarked);
    },
    onError: () => {
      toast.error(readingContent.messages.bookmarkFailed);
    }
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: () => apiClient.entities.Bookmark.delete(bookmarks[0].id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success(readingContent.messages.bookmarkRemoved);
    },
    onError: () => {
      toast.error(readingContent.messages.removeFailed);
    }
  });

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    localStorage.setItem('article-font-size', size);
    onFontSizeChange?.(size);
    toast.success(`${readingContent.messages.fontSizePrefix} ${size}`);
  };

  const handleReadingModeToggle = () => {
    const newMode = readingMode === 'light' ? 'dark' : 'light';
    setReadingMode(newMode);
    localStorage.setItem('article-reading-mode', newMode);
    onReadingModeChange?.(newMode);
  };

  const handleBookmarkToggle = async () => {
    if (!isAuthenticated) {
      toast.error(readingContent.messages.loginRequired);
      return;
    }

    if (isBookmarked) {
      removeBookmarkMutation.mutate();
    } else {
      addBookmarkMutation.mutate();
    }
  };

  return (
    <div 
      className="sticky top-20 z-30 flex items-center justify-end gap-2 p-4 rounded-lg mb-6"
      style={{ 
        backgroundColor: 'color-mix(in srgb, var(--bg-primary) 95%, transparent)',
        backdropFilter: 'blur(10px)',
        borderColor: 'var(--border-color)',
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      {/* Font Size Control */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline">{readingContent.fontSize}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleFontSizeChange('small')}>
            <span className={fontSize === 'small' ? 'font-bold' : ''}>{readingContent.sizes.small}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFontSizeChange('medium')}>
            <span className={fontSize === 'medium' ? 'font-bold' : ''}>{readingContent.sizes.medium}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFontSizeChange('large')}>
            <span className={fontSize === 'large' ? 'font-bold' : ''}>{readingContent.sizes.large}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFontSizeChange('xlarge')}>
            <span className={fontSize === 'xlarge' ? 'font-bold' : ''}>{readingContent.sizes.xlarge}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Reading Mode Toggle */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleReadingModeToggle}
        className="gap-2"
      >
        {readingMode === 'light' ? (
          <>
            <Moon className="w-4 h-4" />
            <span className="hidden sm:inline">{readingContent.darkMode}</span>
          </>
        ) : (
          <>
            <Sun className="w-4 h-4" />
            <span className="hidden sm:inline">{readingContent.lightMode}</span>
          </>
        )}
      </Button>

      {/* Bookmark Button */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleBookmarkToggle}
        className="gap-2"
        disabled={addBookmarkMutation.isPending || removeBookmarkMutation.isPending}
      >
        {isBookmarked ? (
          <>
            <BookmarkCheck className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
            <span className="hidden sm:inline">{readingContent.bookmarked}</span>
          </>
        ) : (
          <>
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">{readingContent.bookmark}</span>
          </>
        )}
      </Button>
    </div>
  );
}