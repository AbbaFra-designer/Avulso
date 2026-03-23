import type { AvatarData, EmotionAnswer } from '../types';

const emotionColors: Record<string, string> = {
  malinconia: '#6e7fc9',
  tensione: '#c96e6e',
  meraviglia: '#c9a96e',
  quiete: '#6ec9a9',
  inquietudine: '#a96ec9',
  gioia: '#c9c96e',
};

export function generateAvatar(
  emotionAnswers: EmotionAnswer[],
  mirrorText: string,
  tempoDescription: string,
  tempoValue: number
): AvatarData {
  // Find top emotion (lowest rank = most important)
  const sorted = [...emotionAnswers].sort((a, b) => a.rank - b.rank);
  const topEmotion = sorted[0]?.emotion || 'meraviglia';

  // Color from top emotion
  const color = emotionColors[topEmotion] || '#c9a96e';

  // Shape from top emotion
  let shapeType: string;
  if (topEmotion === 'malinconia' || topEmotion === 'quiete') {
    shapeType = 'round';
  } else if (topEmotion === 'tensione' || topEmotion === 'inquietudine') {
    shapeType = 'angular';
  } else {
    shapeType = 'hybrid';
  }

  // Pulse speed: tempoValue 0→1 maps to duration 2.0→0.5
  const pulseSpeed = 2.0 - (tempoValue * 1.5);

  // Random position in scene
  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;
  const position: [number, number, number] = [
    randomInRange(-8, 8),
    randomInRange(-3, 3),
    randomInRange(-8, 8),
  ];

  // Poetic reading
  const poeticReading = `Un artista che abita il mondo con ${topEmotion}. Il suo tempo scorre attraverso ${tempoDescription || 'il silenzio delle cose quotidiane'}.`;

  return {
    id: crypto.randomUUID(),
    emotionAnswers,
    mirrorText,
    tempoDescription,
    tempoValue,
    color,
    shapeType,
    pulseSpeed,
    poeticReading,
    position,
  };
}
