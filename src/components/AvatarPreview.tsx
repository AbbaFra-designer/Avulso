import { motion } from 'framer-motion';
import type { AvatarData } from '../types';

interface AvatarPreviewProps {
  avatar: AvatarData;
  onEnter: () => void;
}

export default function AvatarPreview({ avatar, onEnter }: AvatarPreviewProps) {
  const pulse = {
    scale: [0.95, 1.05, 0.95],
    transition: {
      duration: avatar.pulseSpeed,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  const renderShape = () => {
    if (avatar.shapeType === 'round') {
      return (
        <motion.svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          animate={pulse}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="90"
            cy="90"
            r="60"
            fill={avatar.color}
            opacity="0.9"
            filter="url(#glow)"
          />
          <circle
            cx="90"
            cy="90"
            r="72"
            fill="none"
            stroke={avatar.color}
            strokeWidth="1"
            opacity="0.3"
          />
        </motion.svg>
      );
    }

    if (avatar.shapeType === 'angular') {
      // Hexagon
      const points = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const r = 60;
        const xPos = 90 + r * Math.cos(angle);
        const yPos = 90 + r * Math.sin(angle);
        return `${xPos},${yPos}`;
      }).join(' ');

      return (
        <motion.svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          animate={pulse}
        >
          <defs>
            <filter id="glow2">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <polygon
            points={points}
            fill={avatar.color}
            opacity="0.9"
            filter="url(#glow2)"
          />
        </motion.svg>
      );
    }

    // hybrid: rounded rectangle
    return (
      <motion.svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        animate={pulse}
      >
        <defs>
          <filter id="glow3">
            <feGaussianBlur stdDeviation="7" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          x="30"
          y="50"
          width="120"
          height="80"
          rx="20"
          ry="20"
          fill={avatar.color}
          opacity="0.9"
          filter="url(#glow3)"
        />
      </motion.svg>
    );
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        padding: '24px',
      }}
    >
      <h2
        className="font-cormorant"
        style={{ fontSize: '28px', color: '#f0ede8', fontWeight: 400, letterSpacing: '0.04em' }}
      >
        Il tuo avatar
      </h2>

      {renderShape()}

      <p
        className="font-cormorant"
        style={{
          fontSize: '20px',
          color: 'rgba(240,237,232,0.85)',
          fontStyle: 'italic',
          maxWidth: '480px',
          textAlign: 'center',
          lineHeight: 1.7,
        }}
      >
        {avatar.poeticReading}
      </p>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: avatar.color,
            boxShadow: `0 0 12px \${avatar.color}`,
          }}
        />
        <span className="font-space" style={{ fontSize: '13px', color: 'rgba(240,237,232,0.5)' }}>
          {avatar.shapeType}
        </span>
      </div>

      <button
        onClick={onEnter}
        style={{
          marginTop: '8px',
          padding: '14px 56px',
          border: '1px solid #c9a96e',
          background: 'transparent',
          color: '#c9a96e',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '16px',
          fontWeight: 500,
          cursor: 'pointer',
          letterSpacing: '0.08em',
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
        Entra nello spazio
      </button>
    </motion.div>
  );
}
