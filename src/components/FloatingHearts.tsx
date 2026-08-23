import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

interface FloatingHeartsProps {
  count?: number;
  className?: string;
}

export function FloatingHearts({ count = 12, className = '' }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const items: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 5,
      color: Math.random() > 0.5 ? '#F472B6' : '#8B5CF6',
    }));
    setHearts(items);
  }, [count]);

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {hearts.map((h) => (
        <svg
          key={h.id}
          className="absolute opacity-40"
          style={{
            left: `${h.x}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            animation: `floatUp ${h.duration}s ease-in-out ${h.delay}s infinite`,
            color: h.color,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(110vh) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-10vh) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
