import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bookmark, BookmarkCheck, Type, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ArticleReadingControls({ articleId, onFontSizeChange, onReadingModeChange }) {
  const [fontSize, setFontSize] = useState('medium');
  const [readingMode, setReadingMode] = useState('light');
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
      return await base44.entities.Bookmark.filter({ article_id: articleId });
    },
    enabled: isAuthenticated && !!articleId,
  });

  const isBookmarked = bookmarks.length > 0;

  // Bookmark mutations
  const addBookmarkMutation = useMutation({
    mutationFn: () => base44.entities.Bookmark.create({ article_id: articleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success('Article bookmarked!');
    },
    onError: () => {
      toast.error('Failed to bookmark article');
    }
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: () => base44.entities.Bookmark.delete(bookmarks[0].id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success('Bookmark removed');
    },
    onError: () => {
      toast.error('Failed to remove bookmark');
    }
  });

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    localStorage.setItem('article-font-size', size);
    onFontSizeChange?.(size);
    toast.success(`Font size: ${size}`);
  };

  const handleReadingModeToggle = () => {
    const newMode = readingMode === 'light' ? 'dark' : 'light';
    setReadingMode(newMode);
    localStorage.setItem('article-reading-mode', newMode);
    onReadingModeChange?.(newMode);
  };

  const handleBookmarkToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to bookmark articles');
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
            <span className="hidden sm:inline">Font Size</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleFontSizeChange('small')}>
            <span className={fontSize === 'small' ? 'font-bold' : ''}>Small</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFontSizeChange('medium')}>
            <span className={fontSize === 'medium' ? 'font-bold' : ''}>Medium</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFontSizeChange('large')}>
            <span className={fontSize === 'large' ? 'font-bold' : ''}>Large</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFontSizeChange('xlarge')}>
            <span className={fontSize === 'xlarge' ? 'font-bold' : ''}>Extra Large</span>
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
            <span className="hidden sm:inline">Dark Mode</span>
          </>
        ) : (
          <>
            <Sun className="w-4 h-4" />
            <span className="hidden sm:inline">Light Mode</span>
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
            <span className="hidden sm:inline">Bookmarked</span>
          </>
        ) : (
          <>
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">Bookmark</span>
          </>
        )}
      </Button>
    </div>
  );
}