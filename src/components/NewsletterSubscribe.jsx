import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsletterSubscribe({ variant = 'default' }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if email already exists
      const existing = await base44.entities.Newsletter.filter({ email });
      
      if (existing.length > 0) {
        toast.info('You\'re already subscribed!');
        setIsSubscribed(true);
        setEmail('');
        setIsSubmitting(false);
        return;
      }

      await base44.entities.Newsletter.create({
        email,
        subscribed: true,
        interests: []
      });

      setIsSubscribed(true);
      setEmail('');
      toast.success('Successfully subscribed to newsletter!');
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          className="flex-1"
          style={{ 
            backgroundColor: 'var(--bg-primary)', 
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || isSubscribed}
          style={{ 
            background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
            color: 'white'
          }}
        >
          {isSubscribed ? <CheckCircle2 className="w-4 h-4" /> : 'Subscribe'}
        </Button>
      </form>
    );
  }

  return (
    <Card 
      className="p-8"
      style={{ 
        backgroundColor: 'var(--bg-primary)', 
        borderColor: 'var(--border-color)',
        borderWidth: '2px'
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)' }}
        >
          <Mail className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
        </div>
        <div>
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Subscribe to Newsletter
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Get updates on new articles and insights
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isSubscribed ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2 p-4 rounded-lg"
            style={{ backgroundColor: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)' }}
          >
            <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
            <span style={{ color: 'var(--accent-primary)' }}>
              You're subscribed! Check your email.
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="flex-1"
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="whitespace-nowrap"
              style={{ 
                background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
                color: 'white'
              }}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="text-xs mt-4" style={{ color: 'var(--text-tertiary)' }}>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </Card>
  );
}