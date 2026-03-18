export const GAMEBOY_STORAGE_KEY = 'gameboy-mode' as const;
export const GAMEBOY_EVENT = 'gameboy-toggle' as const;

export const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
] as const;

export interface GameBoyToggleDetail {
  active: boolean;
}

export function isGameBoyActive(): boolean {
  return document.documentElement.hasAttribute('data-gameboy');
}

export function applyGameBoyMode(active: boolean): void {
  if (active) {
    document.documentElement.setAttribute('data-gameboy', '');
  } else {
    document.documentElement.removeAttribute('data-gameboy');
  }
}

export function dispatchGameBoyEvent(active: boolean): void {
  window.dispatchEvent(
    new CustomEvent<GameBoyToggleDetail>(GAMEBOY_EVENT, {
      detail: { active },
    }),
  );
}
