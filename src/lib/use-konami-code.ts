import { useEffect, useRef } from 'react';

import { KONAMI_CODE } from '@/lib/gameboy-mode';

export function useKonamiCode(onActivate: () => void): void {
  const bufferRef = useRef<string[]>([]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      bufferRef.current.push(e.code);

      if (bufferRef.current.length > KONAMI_CODE.length) {
        bufferRef.current.shift();
      }

      if (
        bufferRef.current.length === KONAMI_CODE.length &&
        bufferRef.current.every((code, i) => code === KONAMI_CODE[i])
      ) {
        bufferRef.current = [];
        onActivate();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onActivate]);
}
