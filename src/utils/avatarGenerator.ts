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
  gesture: string,
  tempoDescription: string,
  tempoValue: number
): AvatarData {
  // Find top emotion (lowest rank = most important)
  const sorted = [...emotionAnswers].sort((a, b) => a.rank - b.rank);
  const topEmotion = sorted[0]?.emotion || 'meraviglia';

  // Color from top emotion
  const color = emotionColors[topEmotion] || '#c9a96e';

  // Shape from gesture
  let shapeType: string;
  if (gesture === 'ripetere' || gesture === 'raccogliere') {
    shapeType = 'round';
  } else if (gesture === 'interrompere' || gesture === 'costruire') {
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
  const gestureMap: Record<string, string> = {
    ripetere: 'ripete',
    costruire: 'costruisce',
    osservare: 'osserva',
    interrompere: 'interrompe',
    raccogliere: 'raccoglie',
  };
  const verb = gestureMap[gesture] || gesture;
  const poeticReading = `Un artista che ${verb} il mondo con ${topEmotion}. Il suo tempo scorre attraverso ${tempoDescription || 'il silenzio delle cose quotidiane'}.`;

  return {
    id: crypto.randomUUID(),
    emotionAnswers,
    gesture,
    tempoDescription,
    tempoValue,
    color,
    shapeType,
    pulseSpeed,
    poeticReading,
    position,
  };
}
