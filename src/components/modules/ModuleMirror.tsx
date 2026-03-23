import { useState } from 'react';
import { motion } from 'framer-motion';

interface ModuleMirrorProps {
  onComplete: (text: string) => void;
}

const TOOLTIP_TEXT = `Lo sguardo esterno rivela ciò che il corpo sa e la mente non vede. Questi gesti inconsapevoli diventano la firma nascosta del tuo avatar — il movimento che non controlli ma che ti definisce.`;

export default function ModuleMirror({ onComplete }: ModuleMirrorProps) {
  const [text, setText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleComplete = () => {
    onComplete(text);
  };

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
      <div style={{ textAlign: 'center', position: 'relative', width: '100%', maxWidth: '600px' }}>
        <h2
          className="font-cormorant"
          style={{ fontSize: '36px', color: '#f0ede8', fontWeight: 600, marginBottom: '8px' }}
        >
          Pratica Empatica
        </h2>
        <p
          className="font-space"
          style={{ fontSize: '14px', color: 'rgba(240,237,232,0.5)', maxWidth: '460px', margin: '0 auto' }}
        >
          Una piccola prova di sguardo esterno.
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

      {/* Main question — displayed as a poetic prompt */}
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          borderLeft: '2px solid rgba(201,169,110,0.35)',
          paddingLeft: '24px',
        }}
      >
        <p
          className="font-cormorant"
          style={{
            fontSize: '22px',
            color: '#f0ede8',
            lineHeight: 1.75,
            fontStyle: 'italic',
            fontWeight: 400,
            margin: 0,
          }}
        >
          Immagina di essere ripreso da una videocamera inconsapevolmente e poi di guardare il filmato: quali sono quelle cose che fai inconsciamente e che se vedessi dall'esterno ti stupirebbero?
        </p>
      </div>

      {/* Textarea */}
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 280))}
          placeholder="Scrivi quello che vedi nel filmato..."
          style={{
            width: '100%',
            height: '140px',
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
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(201,169,110,0.7)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(201,169,110,0.3)')}
        />
        <div
          style={{
            textAlign: 'right',
            fontSize: '12px',
            color: 'rgba(240,237,232,0.4)',
            marginTop: '4px',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          {text.length} / 280
        </div>
      </div>

      {/* Avanti — always enabled */}
      <button
        onClick={handleComplete}
        style={{
          padding: '12px 48px',
          border: '1px solid #c9a96e',
          background: '#c9a96e',
          color: '#0a0a0f',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '15px',
          fontWeight: 500,
          cursor: 'pointer',
          letterSpacing: '0.06em',
          transition: 'all 300ms ease',
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
            <p
              className="font-cormorant"
              style={{ fontSize: '18px', color: '#f0ede8', lineHeight: 1.7, fontStyle: 'italic' }}
            >
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
