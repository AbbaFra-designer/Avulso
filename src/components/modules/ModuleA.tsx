import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EmotionAnswer } from '../../types';

interface ModuleAProps {
  onComplete: (answers: EmotionAnswer[]) => void;
}

const IMAGES = [
  {
    id: 1,
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg?width=800',
    title: 'La Notte Stellata',
    artist: 'Van Gogh',
  },
  {
    id: 2,
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Scream.jpg?width=600',
    title: "L'Urlo",
    artist: 'Munch',
  },
  {
    id: 3,
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg?width=600',
    title: 'Il Bacio',
    artist: 'Klimt',
  },
  {
    id: 4,
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nighthawks_by_Edward_Hopper_1942.jpg?width=800',
    title: 'Nighthawks',
    artist: 'Hopper',
  },
  {
    id: 5,
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg?width=600',
    title: 'Wanderer sul mare di nebbia',
    artist: 'Friedrich',
  },
  {
    id: 6,
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Girl_with_a_Pearl_Earring.jpg?width=600',
    title: 'Ragazza con orecchino di perla',
    artist: 'Vermeer',
  },
];

const EMOTIONS = ['malinconia', 'tensione', 'meraviglia', 'quiete', 'inquietudine', 'gioia'];

const TOOLTIP_PHASE1 = `Osserva ogni opera e scegli l'emozione che senti più vicina. Non esiste risposta giusta — conta solo la tua reazione istintiva.`;
const TOOLTIP_PHASE2 = `Ora le immagini sono sparite. Resta solo ciò che hai sentito. Clicca le emozioni nell'ordine in cui vorresti viverle — dalla prima all'ultima.`;

// Fisher-Yates shuffle (run once at module load to get a stable random order)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ModuleA({ onComplete }: ModuleAProps) {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [emotionMap, setEmotionMap] = useState<Record<number, string>>({});
  const [rankMap, setRankMap] = useState<Record<number, number>>({});
  const [rankCounter, setRankCounter] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  // Shuffle image IDs once for phase 2
  const [phase2Order] = useState<number[]>(() => shuffle(IMAGES.map((img) => img.id)));

  const allEmotionsSet = IMAGES.every((img) => emotionMap[img.id]);
  const allRanked = Object.keys(rankMap).length === 6;

  const handleEmotionChange = (imageId: number, emotion: string) => {
    setEmotionMap((prev) => ({ ...prev, [imageId]: emotion }));
  };

  const handleCardClick = (imageId: number) => {
    if (rankMap[imageId] || rankCounter > 6) return;
    setRankMap((prev) => ({ ...prev, [imageId]: rankCounter }));
    setRankCounter((c) => c + 1);
  };

  const handleComplete = () => {
    const result: EmotionAnswer[] = IMAGES.map((img) => ({
      imageId: img.id,
      emotion: emotionMap[img.id] || 'meraviglia',
      rank: rankMap[img.id] || 7,
    }));
    onComplete(result);
  };

  const tooltipText = phase === 1 ? TOOLTIP_PHASE1 : TOOLTIP_PHASE2;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: '100vh',
        padding: '80px 24px 60px',
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

        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="font-space"
            style={{ fontSize: '15px', color: 'rgba(240,237,232,0.6)', maxWidth: '500px', margin: '0 auto' }}
          >
            {phase === 1
              ? 'Guarda ogni opera e assegna l\'emozione che senti più vicina.'
              : 'Le immagini sono sparite. Clicca le emozioni nell\'ordine in cui vorresti viverle.'}
          </motion.p>
        </AnimatePresence>

        {/* Phase indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          {[1, 2].map((p) => (
            <div
              key={p}
              style={{
                width: '24px',
                height: '2px',
                borderRadius: '1px',
                background: p === phase ? '#c9a96e' : 'rgba(201,169,110,0.25)',
                transition: 'background 400ms ease',
              }}
            />
          ))}
        </div>

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

      {/* ── PHASE 1: Image grid + emotion selects ── */}
      <AnimatePresence mode="wait">
        {phase === 1 && (
          <motion.div
            key="phase1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              width: '100%',
              maxWidth: '700px',
            }}
          >
            {IMAGES.map((img) => {
              const emotion = emotionMap[img.id];
              return (
                <div key={img.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Image card — not clickable in phase 1 */}
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: emotion
                        ? '2px solid rgba(201,169,110,0.5)'
                        : '2px solid rgba(255,255,255,0.08)',
                      transition: 'border 300ms ease',
                      aspectRatio: '3/2',
                    }}
                  >
                    <img
                      src={img.url}
                      alt={`${img.artist} — ${img.title}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* Caption */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '6px 10px',
                        background: 'linear-gradient(transparent, rgba(10,10,15,0.82))',
                        pointerEvents: 'none',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '11px',
                          color: 'rgba(240,237,232,0.85)',
                          fontFamily: 'Space Grotesk, sans-serif',
                          letterSpacing: '0.03em',
                        }}
                      >
                        {img.artist} — <em>{img.title}</em>
                      </span>
                    </div>
                    {/* Emotion badge (shown when selected) */}
                    {emotion && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'rgba(201,169,110,0.9)',
                          color: '#0a0a0f',
                          borderRadius: '4px',
                          padding: '2px 7px',
                          fontSize: '11px',
                          fontWeight: 600,
                          fontFamily: 'Space Grotesk, sans-serif',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {emotion}
                      </div>
                    )}
                  </div>

                  {/* Emotion select */}
                  <select
                    value={emotion || ''}
                    onChange={(e) => handleEmotionChange(img.id, e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(201,169,110,0.3)',
                      borderRadius: '6px',
                      color: emotion ? '#f0ede8' : 'rgba(240,237,232,0.4)',
                      padding: '6px 10px',
                      fontSize: '13px',
                      fontFamily: 'Space Grotesk, sans-serif',
                      cursor: 'pointer',
                      outline: 'none',
                      width: '100%',
                    }}
                  >
                    <option value="" disabled>
                      emozione
                    </option>
                    {EMOTIONS.map((e) => (
                      <option key={e} value={e} style={{ background: '#1a1a24' }}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* ── PHASE 2: Emotion cards only, no images ── */}
        {phase === 2 && (
          <motion.div
            key="phase2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%',
              maxWidth: '480px',
            }}
          >
            {phase2Order.map((imageId) => {
              const img = IMAGES.find((i) => i.id === imageId)!;
              const emotion = emotionMap[imageId];
              const rank = rankMap[imageId];
              const isRanked = !!rank;

              return (
                <motion.div
                  key={imageId}
                  onClick={() => handleCardClick(imageId)}
                  whileHover={!isRanked ? { x: 4 } : {}}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: isRanked
                      ? '1px solid rgba(201,169,110,0.5)'
                      : '1px solid rgba(255,255,255,0.1)',
                    background: isRanked
                      ? 'rgba(201,169,110,0.07)'
                      : 'rgba(255,255,255,0.03)',
                    cursor: isRanked ? 'default' : 'pointer',
                    transition: 'border 300ms ease, background 300ms ease',
                    userSelect: 'none',
                  }}
                >
                  {/* Rank badge */}
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: isRanked ? 'none' : '1px solid rgba(201,169,110,0.25)',
                      background: isRanked ? '#c9a96e' : 'transparent',
                      color: isRanked ? '#0a0a0f' : 'rgba(201,169,110,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 700,
                      fontFamily: 'Space Grotesk, sans-serif',
                      flexShrink: 0,
                      transition: 'all 300ms ease',
                    }}
                  >
                    {rank || '—'}
                  </div>

                  {/* Emotion word */}
                  <span
                    className="font-cormorant"
                    style={{
                      fontSize: '22px',
                      color: isRanked ? '#f0ede8' : 'rgba(240,237,232,0.65)',
                      fontStyle: 'italic',
                      fontWeight: 400,
                      flex: 1,
                      textAlign: 'center',
                      transition: 'color 300ms ease',
                    }}
                  >
                    {emotion}
                  </span>

                  {/* Artist (right side, subtle) */}
                  <span
                    className="font-space"
                    style={{
                      fontSize: '11px',
                      color: 'rgba(240,237,232,0.3)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      width: '60px',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    {img.artist}
                  </span>
                </motion.div>
              );
            })}

            {/* Hint */}
            {!allRanked && (
              <p
                className="font-space"
                style={{
                  fontSize: '12px',
                  color: 'rgba(240,237,232,0.35)',
                  textAlign: 'center',
                  marginTop: '4px',
                }}
              >
                stai assegnando il rango {Math.min(rankCounter, 6)} di 6
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA button ── */}
      {phase === 1 ? (
        <button
          onClick={() => setPhase(2)}
          disabled={!allEmotionsSet}
          style={{
            padding: '12px 48px',
            border: '1px solid #c9a96e',
            background: allEmotionsSet ? '#c9a96e' : 'transparent',
            color: allEmotionsSet ? '#0a0a0f' : 'rgba(201,169,110,0.4)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            cursor: allEmotionsSet ? 'pointer' : 'not-allowed',
            letterSpacing: '0.06em',
            transition: 'all 300ms ease',
            borderColor: allEmotionsSet ? '#c9a96e' : 'rgba(201,169,110,0.3)',
          }}
        >
          Continua
        </button>
      ) : (
        <button
          onClick={handleComplete}
          disabled={!allRanked}
          style={{
            padding: '12px 48px',
            border: '1px solid #c9a96e',
            background: allRanked ? '#c9a96e' : 'transparent',
            color: allRanked ? '#0a0a0f' : 'rgba(201,169,110,0.4)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            cursor: allRanked ? 'pointer' : 'not-allowed',
            letterSpacing: '0.06em',
            transition: 'all 300ms ease',
            borderColor: allRanked ? '#c9a96e' : 'rgba(201,169,110,0.3)',
          }}
        >
          Avanti
        </button>
      )}

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
            <p
              className="font-cormorant"
              style={{ fontSize: '18px', color: '#f0ede8', lineHeight: 1.7, fontStyle: 'italic' }}
            >
              {tooltipText}
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
