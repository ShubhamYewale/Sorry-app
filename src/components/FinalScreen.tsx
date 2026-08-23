import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { Sparkles } from './Sparkles';
import { FloatingHearts } from './FloatingHearts';
import { config } from '../data/config';

const lines = [
  'Okay...',
  "I'm done now.",
  'Probably. 😂',
  'Just remember...',
  'You are special.',
  'You are appreciated.',
  'And you deserve to be happy.',
  `Keep smiling, ${config.name} ❤️`,
  '— Shubham',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.7,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function FinalScreen() {
  return (
    <section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto section-final px-4 py-12 sm:px-6 sm:py-20"
      aria-label="Final message"
    >
      <Sparkles count={30} />
      <FloatingHearts count={14} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center sm:max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          className="mb-8"
          aria-hidden="true"
        >
          <Heart className="h-20 w-20 fill-pink-400 text-pink-400 drop-shadow-[0_0_40px_rgba(244,114,182,0.6)] sm:h-24 sm:w-24" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4 sm:space-y-5"
        >
          {lines.map((line, index) => (
            <motion.p
              key={line}
              variants={itemVariants}
              className={`text-base text-white/95 sm:text-lg ${index === 7 ? 'text-xl font-semibold text-pink-300 text-glow sm:text-2xl' : ''} ${index === 8 ? 'pt-2 text-white/70' : ''}`}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
