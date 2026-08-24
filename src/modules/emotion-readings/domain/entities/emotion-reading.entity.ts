export class EmotionReadingEntity {
  constructor(
    public readonly readingId: string,
    public readonly sessionId: string,
    public readonly elapsedMsTotal: number,
    public readonly timestampReal: Date,
    public readonly dominantEmotion: string,
    public readonly scoresJson: Record<string, number>,
    public readonly createdAt?: Date,
  ) {}
}