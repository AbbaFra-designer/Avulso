import { useState } from 'react';
import { motion } from 'framer-motion';
import type { EmotionAnswer } from '../../types';

interface ModuleAProps {
  onComplete: (answers: EmotionAnswer[]) => void;
}

const IMAGES = [
  { id: 1, url: 'https://picsum.photos/seed/art1/300/200' },
  { id: 2, url: 'https://picsum.photos/seed/art2/300/200' },
  { id: 3, url: 'https://picsum.photos/seed/art3/300/200' },
  { id: 4, url: 'https://picsum.photos/seed/art4/300/200' },
  { id: 5, url: 'https://picsum.photos/seed/art5/300/200' },
  { id: 6, url: 'https://picsum.photos/seed/art6/300/200' },
];

const EMOTIONS = ['malinconia', 'tensione', 'meraviglia', 'quiete', 'inquietudine', 'gioia'];

const TOOLTIP_TEXT = `Il modo in cui ordini le emozioni rivela le chiavi di lettura che usi per interpretare l'arte. Queste coordinate costruiranno la tua posizione nello spazio condiviso.`;

export default function ModuleA({ onComplete }: ModuleAProps) {
  const [answers, setAnswers] = useState<Record<number, { emotion: string; rank: number }>>({});
  const [rankCounter, setRankCounter] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleImageClick = (imageId: number) => {
    if (answers[imageId]) return; // already ranked
    if (rankCounter > 6) return;
    setAnswers((prev) => ({
      ...prev,
      [imageId]: { emotion: prev[imageId]?.emotion || '', rank: rankCounter },
    }));
    setRankCounter((c) => c + 1);
  };

  const handleEmotionChange = (imageId: number, emotion: string) => {
    setAnswers((prev) => ({
      ...prev,
      [imageId]: { ...prev[imageId], emotion, rank: prev[imageId]?.rank || 0 },
    }));
  };

  const handleComplete = () => {
    const result: EmotionAnswer[] = IMAGES.map((img) => ({
      imageId: img.id,
      emotion: answers[img.id]?.emotion || 'meraviglia',
      rank: answers[img.id]?.rank || 7,
    }));
    onComplete(result);
  };

  const allRanked = Object.keys(answers).length === 6;
  const allEmotions = Object.values(answers).every((a) => a.emotion);
  const canProceed = allRanked && allEmotions;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: '100vh',
        padding: '80px 24px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', position: 'relative', width: '100%', maxWidth: '700px' }}>
        <h2
          className="font-cormorant"
          style={{ fontSize: '36px', color: '#f0ede8', fontWeight: 600, marginBottom: '8px' }}
        >
          Trama Emotiva
        </h2>
        <p
          className="font-space"
          style={{ fontSize: '15px', color: 'rgba(240,237,232,0.6)', maxWidth: '500px', margin: '0 auto' }}
        >
          Ordina queste immagini secondo quello che senti, poi scegli un'emozione per ognuna.
        </p>

        {/* ? button */}
        <button
          onClick={() => setShowTooltip(true)}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: '1px solid rgba(201,169,110,0.5)',
            background: 'transparent',
            color: '#c9a96e',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ?
        </button>
      </div>

      {/* Image grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          width: '100%',
          maxWidth: '700px',
        }}
      >
        {IMAGES.map((img) => {
          const answer = answers[img.id];
          return (
            <div key={img.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                onClick={() => handleImageClick(img.id)}
                style={{
                  position: 'relative',
                  cursor: answer ? 'default' : 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: answer ? '2px solid rgba(201,169,110,0.5)' : '2px solid transparent',
                  transition: 'border 300ms ease',
                  aspectRatio: '3/2',
                }}
              >
                <img
                  src={img.url}
                  alt={`immagine \${img.id}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {answer?.rank && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#c9a96e',
                      color: '#0a0a0f',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 700,
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}
                  >
                    {answer.rank}
                  </div>
                )}
              </div>
              <select
                value={answer?.emotion || ''}
                onChange={(e) => handleEmotionChange(img.id, e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,169,110,0.3)',
                  borderRadius: '6px',
                  color: answer?.emotion ? '#f0ede8' : 'rgba(240,237,232,0.4)',
                  padding: '6px 10px',
                  fontSize: '13px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  cursor: 'pointer',
                  outline: 'none',
                  width: '100%',
                }}
              >
                <option value="" disabled>emozione</option>
                {EMOTIONS.map((e) => (
                  <option key={e} value={e} style={{ background: '#1a1a24' }}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {/* Rank hint */}
      {rankCounter <= 6 && (
        <p className="font-space" style={{ fontSize: '13px', color: 'rgba(240,237,232,0.4)', textAlign: 'center' }}>
          Clicca le immagini per assegnare il rango — stai assegnando il rango {Math.min(rankCounter, 6)}
        </p>
      )}

      {/* Avanti button */}
      <button
        onClick={handleComplete}
        disabled={!canProceed}
        style={{
          padding: '12px 48px',
          border: '1px solid #c9a96e',
          background: canProceed ? '#c9a96e' : 'transparent',
          color: canProceed ? '#0a0a0f' : 'rgba(201,169,110,0.4)',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '15px',
          fontWeight: 500,
          cursor: canProceed ? 'pointer' : 'not-allowed',
          letterSpacing: '0.06em',
          transition: 'all 300ms ease',
          borderColor: canProceed ? '#c9a96e' : 'rgba(201,169,110,0.3)',
        }}
      >
        Avanti
      </button>

      {/* Tooltip overlay */}
      {showTooltip && (
        <div
          onClick={() => setShowTooltip(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,10,15,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#12121a',
              border: '1px solid rgba(201,169,110,0.3)',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '440px',
              textAlign: 'center',
            }}
          >
            <p className="font-cormorant" style={{ fontSize: '18px', color: '#f0ede8', lineHeight: 1.7, fontStyle: 'italic' }}>
              {TOOLTIP_TEXT}
            </p>
            <button
              onClick={() => setShowTooltip(false)}
              style={{
                marginTop: '24px',
                padding: '8px 32px',
                border: '1px solid rgba(201,169,110,0.5)',
                background: 'transparent',
                color: '#c9a96e',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '13px',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
