import React from 'react';
import { Facebook, Youtube, Linkedin, Instagram } from 'lucide-react';

const SocialLinks = () => {
  const socials = [
    { icon: Facebook, url: 'https://www.facebook.com/joe.bains', label: 'Facebook' },
    { icon: Youtube, url: 'https://www.youtube.com/c/joebains', label: 'YouTube' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/joebains', label: 'LinkedIn' },
    { icon: Instagram, url: 'https://www.instagram.com/effortlessbiohacking/', label: 'Instagram' },
  ];

  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      {socials.map(({ icon: Icon, url, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="transition-all duration-300 hover:scale-110"
          style={{
            color: 'var(--text-tertiary)',
          }}
          onMouseEnter={(e) => {
            e.target.style.color = 'var(--accent-primary)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'var(--text-tertiary)';
          }}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;