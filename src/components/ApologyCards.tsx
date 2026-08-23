import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, HelpCircle } from 'lucide-react';
import { Sparkles } from './Sparkles';

interface ApologyCardsProps {
  onSeeMore: () => void;
}

const cards = [
  { id: 1, message: 'I know I can be annoying sometimes 😂' },
  { id: 2, message: 'Sometimes I say stupid things.' },
  { id: 3, message: 'Sometimes my brain just goes on vacation 😭' },
  { id: 4, message: 'But I never want to see you sad.' },
];

export function ApologyCards({ onSeeMore }: ApologyCardsProps) {
  const [opened, setOpened] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    setOpened((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allOpened = opened.size === cards.length;

  return (
    <section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto section-cards px-4 py-12 sm:px-6 sm:py-20"
      aria-label="Apology cards"
    >
      <Sparkles count={20} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-violet-500/15 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center text-xl font-semibold text-white sm:mb-8 sm:text-2xl"
        >
          Okay... hear me out 🥺
        </motion.h2>

        <div className="flex flex-col gap-4">
          {cards.map((card, index) => {
            const isOpen = opened.has(card.id);
            return (
              <motion.button
                key={card.id}
                type="button"
                onClick={() => toggleCard(card.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className="relative min-h-[88px] w-full rounded-2xl glass p-4 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-300/70 sm:p-5"
                aria-expanded={isOpen}
                aria-label={`Apology card ${index + 1}`}
              >
                <motion.div
                  className="flex items-center gap-3"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {index === cards.length - 1 ? (
                    <Heart className="h-5 w-5 fill-pink-400 text-pink-400" />
                  ) : (
                    <HelpCircle className="h-5 w-5 text-violet-300" />
                  )}
                  <span className="text-sm text-white/60">Tap to reveal</span>
                </motion.div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center px-5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-center text-base font-medium text-white">{card.message}</p>
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: allOpened ? 1 : 0, y: allOpened ? 0 : 10 }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <button
            type="button"
            onClick={onSeeMore}
            className="group flex items-center gap-2 text-pink-300 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-300/70 active:scale-95"
            aria-label="See more"
          >
            See more
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
