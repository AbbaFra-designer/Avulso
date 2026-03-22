import { useState } from 'react';
import { motion } from 'framer-motion';

interface ModuleBProps {
  onComplete: (gesture: string) => void;
  initialGesture?: string;
}

const GESTURES = [
  { id: 'ripetere', icon: '🔁', label: 'ripetere' },
  { id: 'costruire', icon: '🔨', label: 'costruire' },
  { id: 'osservare', icon: '👁', label: 'osservare' },
  { id: 'interrompere', icon: '✂️', label: 'interrompere' },
  { id: 'raccogliere', icon: '🫙', label: 'raccogliere' },
];

const TOOLTIP_TEXT = `Le azioni inconsapevoli sono le fondamenta invisibili della pratica artistica. Il sistema le codificherà nel movimento del tuo avatar — la tua firma cinetica.`;

export default function ModuleB({ onComplete, initialGesture = '' }: ModuleBProps) {
  const [description, setDescription] = useState('');
  const [selectedGesture, setSelectedGesture] = useState(initialGesture);
  const [showTooltip, setShowTooltip] = useState(false);

  const canProceed = selectedGesture !== '';

  const handleComplete = () => {
    if (!canProceed) return;
    onComplete(selectedGesture);
  };

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
      <div style={{ textAlign: 'center', position: 'relative', width: '100%', maxWidth: '600px' }}>
        <h2
          className="font-cormorant"
          style={{ fontSize: '36px', color: '#f0ede8', fontWeight: 600, marginBottom: '8px' }}
        >
          Pratica Empatica
        </h2>
        <p
          className="font-space"
          style={{ fontSize: '15px', color: 'rgba(240,237,232,0.6)', maxWidth: '480px', margin: '0 auto' }}
        >
          Descrivi un'azione quotidiana inconsapevole che senti connessa al tuo fare arte.
        </p>
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

      {/* Textarea */}
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 200))}
          placeholder="Descrivi la tua azione quotidiana..."
          style={{
            width: '100%',
            height: '120px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(201,169,110,0.3)',
            borderRadius: '8px',
            color: '#f0ede8',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '15px',
            padding: '16px',
            resize: 'none',
            outline: 'none',
            lineHeight: 1.6,
          }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(201,169,110,0.7)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(201,169,110,0.3)')}
        />
        <div style={{ textAlign: 'right', fontSize: '12px', color: 'rgba(240,237,232,0.4)', marginTop: '4px' }}>
          {description.length} / 200
        </div>
      </div>

      {/* Gesture buttons */}
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <p className="font-space" style={{ fontSize: '13px', color: 'rgba(240,237,232,0.5)', marginBottom: '16px' }}>
          Scegli il gesto che ti rappresenta:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {GESTURES.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGesture(g.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '999px',
                border: selectedGesture === g.id
                  ? '1px solid #c9a96e'
                  : '1px solid rgba(201,169,110,0.25)',
                background: selectedGesture === g.id
                  ? 'rgba(201,169,110,0.15)'
                  : 'transparent',
                color: selectedGesture === g.id ? '#c9a96e' : 'rgba(240,237,232,0.6)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 300ms ease',
              }}
            >
              <span style={{ fontSize: '18px' }}>{g.icon}</span>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Avanti */}
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
