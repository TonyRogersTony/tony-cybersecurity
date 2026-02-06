import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ title, titleHighlight }) {
  return (
    <div className="text-center mb-16">
      <motion.h2 
        className="text-4xl md:text-6xl font-bold mb-4"
        style={{ color: 'var(--text-primary)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}{' '}
        <motion.span 
          className="relative inline-block"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span 
            className="relative z-10"
            style={{ 
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {titleHighlight}
          </span>
          <motion.div 
            className="absolute -bottom-2 left-0 right-0 h-3 -z-10 rounded-full blur-xl"
            style={{ 
              background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
              opacity: 0.3
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.span>
      </motion.h2>
      
      <motion.div 
        className="flex items-center justify-center gap-2"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div 
          className="h-1 rounded-full"
          style={{ 
            width: '80px',
            background: 'linear-gradient(to right, transparent, var(--accent-primary))'
          }}
          animate={{ 
            x: [-10, 0, -10]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: 'var(--accent-primary)' }}
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="h-1 rounded-full"
          style={{ 
            width: '80px',
            background: 'linear-gradient(to left, transparent, var(--accent-secondary))'
          }}
          animate={{ 
            x: [10, 0, 10]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}