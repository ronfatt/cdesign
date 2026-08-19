import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';
import { useCursor } from '../../context/CursorContext';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline-white';
  className?: string;
  magneticStrength?: number;
  type?: 'button' | 'submit' | 'reset';
  cursorText?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  magneticStrength = 0.22,
  type = 'button',
  cursorText,
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [innerPos, setInnerPos] = useState({ x: 0, y: 0 });
  const { setCursorVariant, resetCursor } = useCursor();
  const isTouch = useIsTouchDevice();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isTouch || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Clamped button offset (max 8px)
    setBtnPos({
      x: Math.max(Math.min(deltaX * magneticStrength, 8), -8),
      y: Math.max(Math.min(deltaY * magneticStrength, 8), -8),
    });

    // Independent inner element offset (max 4px)
    setInnerPos({
      x: Math.max(Math.min(deltaX * 0.12, 4), -4),
      y: Math.max(Math.min(deltaY * 0.12, 4), -4),
    });
  }, [isTouch, magneticStrength]);

  const handleMouseLeave = useCallback(() => {
    setBtnPos({ x: 0, y: 0 });
    setInnerPos({ x: 0, y: 0 });
    resetCursor();
  }, [resetCursor]);

  // Variant Styling
  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = 'bg-brand-red text-white hover:bg-brand-black border border-brand-red hover:border-brand-black shadow-md';
  } else if (variant === 'secondary') {
    variantStyles = 'bg-white text-brand-black border border-neutral-300 hover:border-brand-red hover:text-brand-red';
  } else if (variant === 'dark') {
    variantStyles = 'bg-brand-black text-white hover:bg-brand-red border border-brand-black hover:border-brand-red shadow-md';
  } else if (variant === 'outline-white') {
    variantStyles = 'bg-transparent text-white border border-white/40 hover:bg-white hover:text-brand-black';
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorVariant('link', cursorText)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: btnPos.x, y: btnPos.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      className={`relative inline-flex items-center justify-center rounded-subtle text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 select-none overflow-hidden group ${variantStyles} ${className}`}
    >
      <motion.span
        animate={{ x: innerPos.x, y: innerPos.y }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative z-10 flex items-center space-x-2.5 px-6 py-3.5"
      >
        {children}
      </motion.span>
    </motion.button>
  );
};
