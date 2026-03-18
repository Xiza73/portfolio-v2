import { useEffect, useRef } from 'react';

export function useRapidClicks(
  selector: string,
  requiredClicks: number,
  timeWindow: number,
  onActivate: () => void,
): void {
  const timestampsRef = useRef<number[]>([]);

  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    function handleClick() {
      const now = Date.now();
      timestampsRef.current.push(now);
      timestampsRef.current = timestampsRef.current.filter(
        (t) => now - t < timeWindow,
      );

      if (timestampsRef.current.length >= requiredClicks) {
        timestampsRef.current = [];
        onActivate();
      }
    }

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [selector, requiredClicks, timeWindow, onActivate]);
}
