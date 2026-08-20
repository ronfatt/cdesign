import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';

export const CustomCursor: React.FC = () => {
  const { cursorState } = useCursor();
  const isTouch = useIsTouchDevice();
  const [isOverInput, setIsOverInput] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Premium lagged physics with smooth spring
  const springConfig = { damping: 30, stiffness: 320, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable ||
          target.closest('.admin-dashboard-container'))
      ) {
        setIsOverInput(true);
      } else {
        setIsOverInput(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isTouch, mouseX, mouseY]);

  if (isTouch || isOverInput) return null;

  const isExpanded = ['view', 'play', 'drag', 'view_case'].includes(cursorState.variant);
  const isLink = cursorState.variant === 'link';
  const isHidden = cursorState.variant === 'hidden';

  if (isHidden) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central Lagged Follower */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full text-center select-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isExpanded ? 80 : isLink ? 32 : 10,
          height: isExpanded ? 80 : isLink ? 32 : 10,
          backgroundColor: isExpanded
            ? '#F01616'
            : isLink
            ? 'rgba(240, 22, 22, 0.12)'
            : '#F01616',
          border: isLink ? '1.5px solid #F01616' : 'none',
          boxShadow: isExpanded
            ? '0 12px 36px -4px rgba(240, 22, 22, 0.45)'
            : 'none',
        }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 26,
        }}
      >
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-[10px] font-black uppercase tracking-widest text-white leading-none px-2 text-center"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {cursorState.text || (
              cursorState.variant === 'view' ? 'VIEW' :
              cursorState.variant === 'play' ? 'PLAY' :
              cursorState.variant === 'drag' ? 'DRAG' :
              'VIEW CASE'
            )}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};
