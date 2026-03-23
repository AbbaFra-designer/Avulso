export interface EmotionAnswer {
  imageId: number;
  emotion: string;
  rank: number;
}

export interface AvatarData {
  id: string;
  emotionAnswers: EmotionAnswer[];
  mirrorText: string;
  tempoDescription: string;
  tempoValue: number;      // 0 to 1
  color: string;           // hex
  shapeType: string;       // "round" | "angular" | "hybrid"
  pulseSpeed: number;      // derived from tempoValue
  poeticReading: string;   // 2-sentence string generated from inputs
  position: [number, number, number]; // x, y, z in 3D space
}

export type AppStep = "landing" | "onboarding" | "avatar-preview" | "shared-space";

export interface OnboardingData {
  emotionAnswers: EmotionAnswer[];
  mirrorText: string;
  tempoDescription: string;
  tempoValue: number;
}
