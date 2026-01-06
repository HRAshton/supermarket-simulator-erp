import React, { useRef } from 'react';
import { useFocusManager } from './FocusContext';

export function useEnterToNext<T extends HTMLElement>() {
  const { register, focusNext } = useFocusManager();
  const indexRef = useRef<number>(-1);

  function ref(el: T | null) {
    if (el && indexRef.current === -1) {
      indexRef.current = register(el);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<T>) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    focusNext(indexRef.current);
  }

  return { ref, onKeyDown };
}
