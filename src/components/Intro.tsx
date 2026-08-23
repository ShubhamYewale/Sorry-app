import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { Sparkles } from './Sparkles';
import { FloatingHearts } from './FloatingHearts';
import { config } from '../data/config';

interface IntroProps {
  onStart: () => void;
}

const textSteps = [
  `Hey ${config.name}... ❤️`,
  "Okay... I know I messed up 😭",
  "And yes... I'm actually sorry.",
];

export function Intro({ onStart }: IntroProps) {
  const [visibleLines, setVisibleLines] = useState(1);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    onStart();
  };

  const showNext = () => {
    if (visibleLines < textSteps.length) {
      setVisibleLines((v) => v + 1);
    }
  };

  return (
    <section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto section-intro px-4 py-12 sm:px-6"
      aria-label="Intro"
    >
      <Sparkles count={30} />
      <FloatingHearts count={10} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-violet-600/20 blur-[80px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center sm:max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: started ? 1.4 : 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <Heart
            className="h-16 w-16 fill-pink-400 text-pink-400 drop-shadow-[0_0_24px_rgba(244,114,182,0.7)]"
            aria-hidden="true"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {textSteps.slice(0, visibleLines).map((text, index) => (
            <motion.p
              key={text}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onAnimationComplete={index === visibleLines - 1 && visibleLines < textSteps.length ? showNext : undefined}
              className="text-lg font-medium leading-relaxed text-white/95 sm:text-xl md:text-2xl"
            >
              {text}
            </motion.p>
          ))}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleLines === textSteps.length ? 1 : 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-sm text-white/70"
        >
          So I made this little thing for you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visibleLines === textSteps.length ? 1 : 0, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="mt-8 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 active:scale-95"
          aria-label="Start the experience"
        >
          Okay, show me 👀
        </motion.button>
      </div>
    </section>
  );
}
