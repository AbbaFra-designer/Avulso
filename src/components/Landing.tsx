import { motion } from 'framer-motion';
import { useRef } from 'react';

interface LandingProps {
  onEnter: () => void;
}

interface Dot {
  id: number;
  left: string;
  top: string;
  size: string;
  duration: string;
  delay: string;
  opacity: string;
}

export default function Landing({ onEnter }: LandingProps) {
  const dotsRef = useRef<Dot[]>([]);

  if (dotsRef.current.length === 0) {
    dotsRef.current = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `\${Math.random() * 100}%`,
      top: `\${Math.random() * 100}%`,
      size: `\${Math.random() * 3 + 1}px`,
      duration: `\${Math.random() * 10 + 8}s`,
      delay: `\${Math.random() * 8}s`,
      opacity: `\${Math.random() * 0.5 + 0.1}`,
    }));
  }

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Floating dots */}
      {dotsRef.current.map((dot) => (
        <div
          key={dot.id}
          className="dot-float"
          style={{
            position: 'absolute',
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            background: 'white',
            opacity: dot.opacity,
            animationDuration: dot.duration,
            animationDelay: dot.delay,
          }}
        />
      ))}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          padding: '0 24px',
        }}
      >
        <h1
          className="font-cormorant"
          style={{
            fontSize: 'clamp(48px, 8vw, 72px)',
            color: '#f0ede8',
            fontWeight: 400,
            letterSpacing: '0.02em',
            lineHeight: 1.1,
          }}
        >
          Doppia Libertà
        </h1>

        <p
          className="font-space"
          style={{
            fontSize: '18px',
            color: 'rgba(240,237,232,0.6)',
            maxWidth: '420px',
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Uno spazio tridimensionale costruito dagli artisti che lo abitano
        </p>

        <button
          onClick={onEnter}
          style={{
            marginTop: '8px',
            padding: '12px 40px',
            border: '1px solid #c9a96e',
            background: 'transparent',
            color: '#c9a96e',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            transition: 'all 300ms ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background = '#c9a96e';
            (e.target as HTMLButtonElement).style.color = '#0a0a0f';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = 'transparent';
            (e.target as HTMLButtonElement).style.color = '#c9a96e';
          }}
        >
          Entra
        </button>
      </div>
    </motion.div>
  );
}
