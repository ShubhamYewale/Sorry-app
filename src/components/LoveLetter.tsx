import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { config } from '../data/config';

interface LoveLetterProps {
  onNext: () => void;
}

export function LoveLetter({ onNext }: LoveLetterProps) {
  return (
    <section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto section-letter px-4 py-10 sm:px-6 sm:py-20"
      aria-label="Personal letter"
    >
      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-h-[78dvh] overflow-y-auto rounded-3xl paper-texture p-5 shadow-2xl shadow-pink-900/20 sm:p-6"
        >
          <div className="mb-4 flex justify-center text-3xl text-pink-400" aria-hidden="true">
            💌
          </div>

          <h2 className="mb-4 text-center text-xl text-pink-500 font-handwritten sm:text-2xl">
            Okay... one serious message.
          </h2>

          <div className="space-y-3 text-pink-950 text-sm md:text-base font-handwritten">
            <p className="text-lg">Dear {config.name},</p>

            <p>
              I&apos;m really sorry, My Pasandida Aurat. 🥺
            </p>

            <p>
              I accidentally upset the most precious and adorable person in my life — you. And honestly, what a stupid achievement. 😭😂
            </p>

            <p>
              Please forgive me if I hurt you or wasted even a little of your precious time. I promise I never meant to. ❤️
            </p>

            <p>
              I know I can be annoying sometimes, I overthink way too much, and sometimes my brain just stops working. 😂
            </p>

            <p>
              But one thing is always true — I never want to be the reason behind your sad face.
            </p>

            <p>
              So... consider this my tiny peace offering. 🥺💕
            </p>

            <p className="text-base font-medium">
              Now please smile again... because honestly, your smile is much better than your angry face. 😂❤️
            </p>

            <p className="pt-2 text-lg">— Shubham</p>
          </div>

          <div className="mt-4 flex justify-center gap-2 text-pink-300" aria-hidden="true">
            <span>❤</span>
            <span>❤</span>
            <span>❤</span>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            type="button"
            className="mx-auto mt-6 flex items-center gap-2 rounded-full bg-pink-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-300/70 active:scale-95"
            aria-label="Next page"
          >
            Next
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
