import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OnboardingData, EmotionAnswer } from '../types';
import ModuleA from './modules/ModuleA';
import ModuleMirror from './modules/ModuleMirror';
import ModuleC from './modules/ModuleC';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [moduleIndex, setModuleIndex] = useState(0);
  const [emotionAnswers, setEmotionAnswers] = useState<EmotionAnswer[]>([]);
  const [mirrorText, setMirrorText] = useState('');

  const TOTAL = 3;

  const handleModuleAComplete = (answers: EmotionAnswer[]) => {
    setEmotionAnswers(answers);
    setModuleIndex(1);
  };

  const handleModuleMirrorComplete = (text: string) => {
    setMirrorText(text);
    setModuleIndex(2);
  };

  const handleModuleCComplete = (desc: string, val: number) => {
    onComplete({
      emotionAnswers,
      mirrorText,
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
        {Array.from({ length: TOTAL }, (_, i) => i).map((i) => (
          <div
            key={i}
            style={{
              width: i === moduleIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === moduleIndex
                ? '#c9a96e'
                : i < moduleIndex
                ? 'rgba(201,169,110,0.55)'
                : 'rgba(201,169,110,0.3)',
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
          {moduleIndex + 1} / {TOTAL}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {moduleIndex === 0 && (
          <ModuleA key="a" onComplete={handleModuleAComplete} />
        )}
        {moduleIndex === 1 && (
          <ModuleMirror key="mirror" onComplete={handleModuleMirrorComplete} />
        )}
        {moduleIndex === 2 && (
          <ModuleC key="c" onComplete={handleModuleCComplete} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
