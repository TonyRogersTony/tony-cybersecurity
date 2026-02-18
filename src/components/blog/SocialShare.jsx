import React from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin, Mail, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { content } from '../content';

export default function SocialShare({ article, url }) {
  const shareContent = content.socialShare;
  const shareUrl = url || window.location.href;
  const title = article.title;
  const excerpt = article.excerpt || '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success(shareContent.linkCopied);
  };

  const handleTwitterShare = () => {
    const text = `${title}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };

  const handleEmailShare = () => {
    const subject = `${shareContent.checkOut} ${title}`;
    const body = `${shareContent.emailIntro}\n\n${title}\n${excerpt}\n\n${shareContent.readMore} ${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div 
      className="flex flex-wrap items-center gap-3 p-6 rounded-lg"
      style={{ 
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-color)',
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      <span className="text-sm font-medium mr-2" style={{ color: 'var(--text-secondary)' }}>
        {shareContent.shareThisArticle}
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleTwitterShare}
        className="gap-2"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <Twitter className="w-4 h-4" style={{ color: '#1DA1F2' }} />
        <span style={{ color: 'var(--text-primary)' }}>{shareContent.buttons.twitter}</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleFacebookShare}
        className="gap-2"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <Facebook className="w-4 h-4" style={{ color: '#1877F2' }} />
        <span style={{ color: 'var(--text-primary)' }}>{shareContent.buttons.facebook}</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleLinkedInShare}
        className="gap-2"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <Linkedin className="w-4 h-4" style={{ color: '#0A66C2' }} />
        <span style={{ color: 'var(--text-primary)' }}>{shareContent.buttons.linkedin}</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleEmailShare}
        className="gap-2"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <Mail className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
        <span style={{ color: 'var(--text-primary)' }}>{shareContent.buttons.email}</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="gap-2"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <LinkIcon className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
        <span style={{ color: 'var(--text-primary)' }}>{shareContent.buttons.copyLink}</span>
      </Button>
    </div>
  );
}