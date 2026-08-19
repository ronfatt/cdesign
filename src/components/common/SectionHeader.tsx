import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  tag: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'right' | 'between';
  theme?: 'light' | 'dark';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  tag,
  title,
  subtitle,
  align = 'between',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`mb-16 pb-8 border-b ${isDark ? 'border-neutral-800' : 'border-neutral-200'} flex flex-col md:flex-row md:items-end justify-between gap-6`}>
      <div>
        {/* Animated Kicker with line draw */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-3 mb-3"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-6 h-[2px] bg-brand-red origin-left"
          />
          <span className={`text-xs font-mono font-bold tracking-[0.25em] uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {number} — {tag}
          </span>
        </motion.div>

        {/* Big Title with Line Mask Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`font-display-huge text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none ${
            isDark ? 'text-white' : 'text-brand-black'
          }`}
        >
          {title}
        </motion.div>
      </div>

      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`max-w-md ${align === 'right' ? 'text-left md:text-right' : 'text-left'}`}
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  );
};
