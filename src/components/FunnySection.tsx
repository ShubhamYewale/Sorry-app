import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Sparkles } from './Sparkles';
import { FloatingHearts } from './FloatingHearts';
import { CuteCharacter } from './CuteCharacter';

interface FunnySectionProps {
  onNext: () => void;
}

export function FunnySection({ onNext }: FunnySectionProps) {
  return (
    <section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto bg-gradient-to-b from-[#831843] via-[#A8557C] to-[#FBCFE8] px-4 py-12 sm:px-6 sm:py-20"
      aria-label="Funny section"
    >
      <Sparkles count={16} />
      <FloatingHearts count={8} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-pink-400/25 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm text-center sm:max-w-md">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold text-white sm:text-2xl"
        >
          Okay... one more thing 😂
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mx-auto mb-6 mt-8 flex h-32 w-32 items-center justify-center rounded-full bg-white/20 shadow-lg backdrop-blur-sm"
          aria-hidden="true"
        >
          <CuteCharacter className="h-24 w-24" />
        </motion.div>

        <div className="space-y-4">
          {[
            'Sometimes I annoy you.',
            'Sometimes you annoy me too. 😂',
            'But somehow...',
          ].map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="text-lg text-white/90"
            >
              {line}
            </motion.p>
          ))}

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, type: 'spring' }}
            className="pt-2 text-2xl font-bold leading-tight text-white text-glow sm:text-3xl"
          >
            We still end up laughing.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="text-base text-white/80"
          >
            That&apos;s actually my favorite part.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            type="button"
            className="mt-8 flex items-center gap-2 rounded-full bg-white/20 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 active:scale-95"
            aria-label="Next page"
          >
            Next
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
