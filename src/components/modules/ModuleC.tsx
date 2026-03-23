import { useState } from 'react';
import { motion } from 'framer-motion';

interface ModuleCProps {
  onComplete: (description: string, tempoValue: number) => void;
}

const TOOLTIP_TEXT = `Ognuno ha un ritmo interno che scandisce il proprio essere artista. Il tuo "orologio" diventerà il battito con cui il tuo avatar si muoverà nello spazio.`;

export default function ModuleC({ onComplete }: ModuleCProps) {
  const [description, setDescription] = useState('');
  const [tempoValue, setTempoValue] = useState(0.5);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleComplete = () => {
    onComplete(description, tempoValue);
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
          Dispositivo di Percezione Temporale
        </h2>
        <p
          className="font-space"
          style={{ fontSize: '15px', color: 'rgba(240,237,232,0.6)', maxWidth: '480px', margin: '0 auto' }}
        >
          Qual è il tuo orologio personale? Una persona, un luogo, un oggetto che quando lo incontri nuovamente ti fa capire quanto sei cambiato dall'ultima volta in cui lo hai visto?
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
          onChange={(e) => setDescription(e.target.value.slice(0, 150))}
          placeholder="Il mio orologio personale è..."
          style={{
            width: '100%',
            height: '100px',
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
          {description.length} / 150
        </div>
      </div>

      {/* Slider */}
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span className="font-space" style={{ fontSize: '13px', color: 'rgba(240,237,232,0.5)' }}>lento</span>
          <span className="font-space" style={{ fontSize: '13px', color: 'rgba(240,237,232,0.5)' }}>veloce</span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={tempoValue}
          onChange={(e) => setTempoValue(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      {/* Avanti */}
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
