import React, { createContext, useContext, useRef } from 'react';

type FocusContextType = {
  register: (el: HTMLElement | null) => number;
  focusNext: (index: number) => void;
};

const FocusContext = createContext<FocusContextType | null>(null);

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const refs = useRef<HTMLElement[]>([]);

  function register(el: HTMLElement | null) {
    if (!el) return -1;
    const index = refs.current.length;
    refs.current[index] = el;
    return index;
  }

  function focusNext(index: number) {
    refs.current[index + 1]?.focus();
  }

  return (
    <FocusContext.Provider value={{ register, focusNext }}>
      {children}
    </FocusContext.Provider>
  );
}

export function useFocusManager() {
  const ctx = useContext(FocusContext);
  if (!ctx) {
    throw new Error('useFocusManager must be used inside FocusProvider');
  }
  return ctx;
}
