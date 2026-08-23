import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { memories } from '../data/memories';

interface SweetMomentsProps {
  onNext: () => void;
}

export function SweetMoments({ onNext }: SweetMomentsProps) {
  const memory = memories[0];

  return (
    <section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto section-photos px-4 py-12 sm:px-6 sm:py-20"
      aria-label="Sweet moments"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-80 w-80 rounded-full bg-pink-500/20 blur-[100px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center sm:max-w-md">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-xl font-semibold text-white sm:text-2xl"
        >
          A Sweet Moment ❤️
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: memory.rotation ?? 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
          className="mt-6 w-[min(280px,82vw)] rounded-2xl bg-white p-3 shadow-xl shadow-black/20 sm:mt-8"
        >
          <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-violet-100">
            <img
              src={memory.image}
              alt={memory.caption}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-3 text-center text-sm font-medium text-violet-950">
            {memory.caption}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          type="button"
          className="mt-10 flex items-center gap-2 rounded-full bg-white/15 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 active:scale-95"
          aria-label="Next page"
        >
          Next
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </section>
  );
}
