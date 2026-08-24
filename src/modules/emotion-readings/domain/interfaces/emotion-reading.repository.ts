import { EmotionReadingEntity } from '../entities/emotion-reading.entity';

export const EMOTION_READING_REPOSITORY =
  'EMOTION_READING_REPOSITORY';

export interface EmotionReadingRepository {

  create(
    emotion: EmotionReadingEntity,
  ): Promise<EmotionReadingEntity>;

  findById(
    id: string,
  ): Promise<EmotionReadingEntity | null>;

  findAll(): Promise<EmotionReadingEntity[]>;

  findBySession(
    sessionId: string,
  ): Promise<EmotionReadingEntity[]>;

  update(
    id: string,
    emotion: Partial<EmotionReadingEntity>,
  ): Promise<EmotionReadingEntity>;

  delete(
    id: string,
  ): Promise<void>;

}