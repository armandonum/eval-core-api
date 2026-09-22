import { BadRequestException } from '@nestjs/common';

const VALID_EMOTIONS = [
  'happy',
  'sad',
  'angry',
  'fearful',
  'surprised',
  'neutral',
  'disgust',
];

export class DominantEmotionVO {

  private readonly value: string;

  constructor(emotion: string) {

    if (!VALID_EMOTIONS.includes(emotion)) {
      throw new BadRequestException(
        `Emoción inválida: ${emotion}`,
      );
    }

    this.value = emotion;
  }

  getValue(): string {
    return this.value;
  }

}