import { motion } from 'motion/react';

interface ProgressIndicatorProps {
  steps: number;
  current: number;
  className?: string;
}

export function ProgressIndicator({ steps, current, className = '' }: ProgressIndicatorProps) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={steps}
      aria-valuenow={current}
      aria-label="Progress through the story"
    >
      {Array.from({ length: steps }, (_, i) => (
        <motion.div
          key={i}
          className="h-2 rounded-full"
          initial={false}
          animate={{
            width: i < current ? 24 : 8,
            backgroundColor: i < current ? '#F472B6' : 'rgba(255,255,255,0.25)',
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}
