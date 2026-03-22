import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OnboardingData, EmotionAnswer } from '../types';
import ModuleA from './modules/ModuleA';
import ModuleB from './modules/ModuleB';
import ModuleC from './modules/ModuleC';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [moduleIndex, setModuleIndex] = useState(0);
  const [emotionAnswers, setEmotionAnswers] = useState<EmotionAnswer[]>([]);
  const [gesture, setGesture] = useState('');

  const handleModuleAComplete = (answers: EmotionAnswer[]) => {
    setEmotionAnswers(answers);
    setModuleIndex(1);
  };

  const handleModuleBComplete = (g: string) => {
    setGesture(g);
    setModuleIndex(2);
  };

  const handleModuleCComplete = (desc: string, val: number) => {
    onComplete({
      emotionAnswers,
      gesture,
      tempoDescription: desc,
      tempoValue: val,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0a0f',
        overflow: 'hidden auto',
      }}
    >
      {/* Step indicator */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: i === moduleIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === moduleIndex ? '#c9a96e' : 'rgba(201,169,110,0.3)',
              transition: 'all 300ms ease',
            }}
          />
        ))}
        <span
          className="font-space"
          style={{
            marginLeft: '8px',
            color: 'rgba(240,237,232,0.5)',
            fontSize: '13px',
          }}
        >
          {moduleIndex + 1} / 3
        </span>
      </div>

      <AnimatePresence mode="wait">
        {moduleIndex === 0 && (
          <ModuleA key="a" onComplete={handleModuleAComplete} />
        )}
        {moduleIndex === 1 && (
          <ModuleB key="b" onComplete={handleModuleBComplete} initialGesture={gesture} />
        )}
        {moduleIndex === 2 && (
          <ModuleC key="c" onComplete={handleModuleCComplete} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
