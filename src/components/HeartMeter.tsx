import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight } from 'lucide-react';
import { FloatingHearts } from './FloatingHearts';

interface HeartMeterProps {
  onNext: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function HeartMeter({ onNext }: HeartMeterProps) {
  const [level, setLevel] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    'Smile level: 0%',
    'Smile level: 20%',
    'Smile level: 40%',
    'Smile level: 60%',
    'Smile level: 80%',
    'Smile level: 100%',
  ];

  const tap = useCallback(() => {
    if (level >= 100) return;

    const newLevel = Math.min(level + 20, 100);
    setLevel(newLevel);
    setMessageIndex(newLevel / 20);

    const newParticles: Particle[] = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 120 - 60,
      y: Math.random() * 120 - 60,
      color: Math.random() > 0.5 ? '#F472B6' : '#8B5CF6',
    }));
    setParticles((prev) => [...prev, ...newParticles].slice(-30));

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 900);
  }, [level]);

  return (
    <section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto bg-gradient-to-b from-[#FCE7F3] to-[#FDF2F8] px-4 py-10 sm:px-6 sm:py-20"
      aria-label="Heart meter"
    >
      <FloatingHearts count={10} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-pink-300/25 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm text-center sm:max-w-md">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-pink-900"
        >
          One tiny thing...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-2 text-base text-pink-700"
        >
          Tap the heart ❤️
        </motion.p>

        <div className="relative mt-10 flex h-40 items-center justify-center">
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.2, x: p.x, y: p.y }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="absolute"
                aria-hidden="true"
              >
                <Heart className="h-6 w-6" fill={p.color} color={p.color} />
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={tap}
            whileTap={{ scale: 0.85 }}
            animate={{
              scale: level === 100 ? [1, 1.15, 1] : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-400/70"
            aria-label="Tap the heart"
          >
            <Heart
              className="h-24 w-24 drop-shadow-[0_0_30px_rgba(244,114,182,0.6)] transition-all"
              fill={level === 100 ? '#F472B6' : '#FBCFE8'}
              color="#F472B6"
            />
          </motion.button>
        </div>

        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-xl font-semibold text-pink-600"
          aria-live="polite"
        >
          {messages[messageIndex]}
        </motion.div>

        {level === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 space-y-2"
          >
            <p className="text-lg text-pink-700">Okayyy 😂</p>
            <p className="text-base font-medium text-pink-800">Mission successful.</p>
            <p className="text-sm text-pink-600">I just wanted to make you smile.</p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              type="button"
              className="mx-auto mt-4 flex items-center gap-2 rounded-full bg-pink-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-400/70 active:scale-95"
              aria-label="Next page"
            >
              Next
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
