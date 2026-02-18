import { useEffect } from 'react';

const CALENDLY_CSS_ID = 'calendly-widget-css';
const CALENDLY_SCRIPT_ID = 'calendly-widget-js';
const DEFAULT_CALENDLY_URL = 'https://calendly.com/biohackinghealthcoach/30min';

const getCalendlyConfig = () => ({
  url: import.meta.env.VITE_CALENDLY_URL || DEFAULT_CALENDLY_URL,
  text: 'Let\'s Connect',
  color: '#3b82f6',
  textColor: '#ffffff',
  branding: true,
});

const initCalendlyBadge = () => {
  if (!window.Calendly?.initBadgeWidget) return;

  const existingBadge = document.querySelector('.calendly-badge-widget');
  if (existingBadge) {
    existingBadge.remove();
  }

  window.Calendly.initBadgeWidget({
    ...getCalendlyConfig(),
  });
};

export default function CalendlyBadge() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!document.getElementById(CALENDLY_CSS_ID)) {
      const link = document.createElement('link');
      link.id = CALENDLY_CSS_ID;
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    const existingScript = document.getElementById(CALENDLY_SCRIPT_ID);

    if (existingScript) {
      initCalendlyBadge();
      return;
    }

    const script = document.createElement('script');
    script.id = CALENDLY_SCRIPT_ID;
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = initCalendlyBadge;
    document.body.appendChild(script);
  }, []);

  return null;
}
