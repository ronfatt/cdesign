import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CursorState } from '../types';

interface CursorContextType {
  cursorState: CursorState;
  setCursorVariant: (variant: CursorState['variant'], text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: 'default',
    text: ''
  });

  const setCursorVariant = (variant: CursorState['variant'], text?: string) => {
    setCursorState({ variant, text });
  };

  const resetCursor = () => {
    setCursorState({ variant: 'default', text: '' });
  };

  return (
    <CursorContext.Provider value={{ cursorState, setCursorVariant, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = (): CursorContextType => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
