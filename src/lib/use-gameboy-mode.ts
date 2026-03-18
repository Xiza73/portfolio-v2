import { useEffect, useState } from 'react';

import {
  GAMEBOY_EVENT,
  GAMEBOY_STORAGE_KEY,
  type GameBoyToggleDetail,
} from '@/lib/gameboy-mode';

export function useGameBoyMode(): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(localStorage.getItem(GAMEBOY_STORAGE_KEY) === 'on');

    function handleToggle(e: Event) {
      const detail = (e as CustomEvent<GameBoyToggleDetail>).detail;
      setActive(detail.active);
    }

    window.addEventListener(GAMEBOY_EVENT, handleToggle);
    return () => window.removeEventListener(GAMEBOY_EVENT, handleToggle);
  }, []);

  return active;
}
