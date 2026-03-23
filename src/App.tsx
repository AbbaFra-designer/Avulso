import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { AppStep, AvatarData, OnboardingData } from './types';
import Landing from './components/Landing';
import Onboarding from './components/Onboarding';
import AvatarPreview from './components/AvatarPreview';
import SharedSpace from './components/SharedSpace';
import { generateAvatar } from './utils/avatarGenerator';

function App() {
  const [step, setStep] = useState<AppStep>('landing');
  const [avatarData, setAvatarData] = useState<AvatarData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('doppiaLiberta_avatar');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AvatarData;
        setAvatarData(parsed);
        setStep('shared-space');
      } catch {
        // ignore
      }
    }
  }, []);

  const handleOnboardingComplete = (data: OnboardingData) => {
    const avatar = generateAvatar(
      data.emotionAnswers,
      data.mirrorText,
      data.tempoDescription,
      data.tempoValue
    );
    setAvatarData(avatar);
    setStep('avatar-preview');
  };

  const handleAvatarEnter = () => {
    if (avatarData) {
      localStorage.setItem('doppiaLiberta_avatar', JSON.stringify(avatarData));
      setStep('shared-space');
    }
  };

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <Landing key="landing" onEnter={() => setStep('onboarding')} />
        )}
        {step === 'onboarding' && (
          <Onboarding
            key="onboarding"
            onComplete={handleOnboardingComplete}
          />
        )}
        {step === 'avatar-preview' && avatarData && (
          <AvatarPreview
            key="avatar-preview"
            avatar={avatarData}
            onEnter={handleAvatarEnter}
          />
        )}
        {step === 'shared-space' && avatarData && (
          <SharedSpace key="shared-space" userAvatar={avatarData} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
