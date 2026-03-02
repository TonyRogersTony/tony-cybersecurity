import React from 'react';
import { Facebook, Youtube, Linkedin, Instagram, Mail } from 'lucide-react';
import { content } from './content';

const SocialLinks = () => {
  const iconMap = {
    facebook: Facebook,
    youtube: Youtube,
    linkedin: Linkedin,
    instagram: Instagram,
    mail: Mail,
  };

  const socials = content.socialLinks.items.map((item) => ({
    ...item,
    icon: iconMap[item.icon],
  }));

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