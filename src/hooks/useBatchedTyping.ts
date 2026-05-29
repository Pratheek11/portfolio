import { useEffect, useRef, useState } from 'react';

type UseBatchedTypingResult = {
  displayed: string;
  isTyping: boolean;
  start: (text: string, batchSize?: number, delay?: number) => void;
  stop: () => void;
};

export default function useBatchedTyping(): UseBatchedTypingResult {
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const stop = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTyping(false);
  };

  const start = (text: string, batchSize = 2, delay = 120) => {
    stop();
    const words = String(text).split(" ");
    let index = 0;
    setDisplayed('');
    setIsTyping(true);

    intervalRef.current = window.setInterval(() => {
      index = Math.min(index + batchSize, words.length);
      setDisplayed(words.slice(0, index).join(' '));
      if (index >= words.length) {
        stop();
      }
    }, delay);
  };

  useEffect(() => {
    return () => stop();
  }, []);

  return { displayed, isTyping, start, stop };
}
