import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Intro } from './components/Intro';
import { ApologyCards } from './components/ApologyCards';
import { SweetMoments } from './components/SweetMoments';
import { FunnySection } from './components/FunnySection';
import { LoveLetter } from './components/LoveLetter';
import { HeartMeter } from './components/HeartMeter';
import { FinalScreen } from './components/FinalScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { StoryMeta } from './components/StoryMeta';
import { config } from './data/config';

const TOTAL_STEPS = 7;

const pageVariants = {
  initial: { opacity: 0, x: 60, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.98 },
};

const pageTransition = {
  duration: 0.45,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
};

function StoryPage() {
  const [musicStarted, setMusicStarted] = useState(false);
  const [page, setPage] = useState(1);

  const next = () => setPage((p) => Math.min(p + 1, TOTAL_STEPS));

  const handleStart = () => {
    setMusicStarted(true);
    next();
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return <Intro key="intro" onStart={handleStart} />;
      case 2:
        return <ApologyCards key="apology" onSeeMore={next} />;
      case 3:
        return <SweetMoments key="photos" onNext={next} />;
      case 4:
        return <FunnySection key="funny" onNext={next} />;
      case 5:
        return <LoveLetter key="letter" onNext={next} />;
      case 6:
        return <HeartMeter key="heart" onNext={next} />;
      case 7:
        return <FinalScreen key="final" />;
      default:
        return <Intro key="intro" onStart={handleStart} />;
    }
  };

  return (
    <div className="dark relative min-h-[100dvh] w-full overflow-x-hidden bg-background text-foreground">
      <StoryMeta />

      <div className="mx-auto min-h-[100dvh] w-full max-w-md md:max-w-lg">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="min-h-[100dvh] w-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      <MusicPlayer
        src={config.audioPath}
        isPlaying={musicStarted}
        onTogglePlay={() => setMusicStarted((p) => !p)}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
