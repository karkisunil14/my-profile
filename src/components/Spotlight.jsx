import { useEffect } from 'react';

export default function Spotlight() {
  useEffect(() => {
    const handleMove = (e) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return <div className="spotlight hidden sm:block" />;
}
