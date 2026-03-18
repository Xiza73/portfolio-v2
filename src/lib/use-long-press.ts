import { useCallback, useRef } from 'react';

interface UseLongPressOptions {
  duration?: number;
  onStart?: () => void;
  onCancel?: () => void;
}

export function useLongPress(
  onLongPress: () => void,
  { duration = 1500, onStart, onCancel }: UseLongPressOptions = {},
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(() => {
    onStart?.();
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      onLongPress();
    }, duration);
  }, [onLongPress, duration, onStart]);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      onCancel?.();
    }
  }, [onCancel]);

  return {
    onPointerDown: start,
    onPointerUp: cancel,
    onPointerLeave: cancel,
  };
}
