import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EmotionReadingRepository } from '../../domain/interfaces/emotion-reading.repository';
import { EmotionReadingEntity } from '../../domain/entities/emotion-reading.entity';

import { EmotionReadingMapper } from '../typeorm/emotion-reading.mapper';
import { EmotionReadingTypeormEntity } from '../typeorm/emotion-reading.typeorm.entity';

@Injectable()
export class EmotionReadingRepositoryImpl
  implements EmotionReadingRepository
{
  constructor(
    @InjectRepository(EmotionReadingTypeormEntity)
    private readonly repository: Repository<EmotionReadingTypeormEntity>,
  ) {}

  async create(
    emotion: EmotionReadingEntity,
  ): Promise<EmotionReadingEntity> {

    const orm = EmotionReadingMapper.toOrm(emotion);

    const saved = await this.repository.save(orm);

    return EmotionReadingMapper.toDomain(saved);

  }

  async findById(
    id: string,
  ): Promise<EmotionReadingEntity | null> {

    const emotion = await this.repository.findOne({
      where: {
        reading_id: id,
      },
    });

    if (!emotion) {
      return null;
    }

    return EmotionReadingMapper.toDomain(emotion);

  }

  async findAll(): Promise<EmotionReadingEntity[]> {

    const emotions = await this.repository.find({
      order: {
        timestamp_real: 'ASC',
      },
    });

    return emotions.map(EmotionReadingMapper.toDomain);

  }

  async findBySession(
    sessionId: string,
  ): Promise<EmotionReadingEntity[]> {

    const emotions = await this.repository.find({
      where: {
        session_id: sessionId,
      },
      order: {
        elapsed_ms_total: 'ASC',
      },
    });

    return emotions.map(EmotionReadingMapper.toDomain);

  }

  async update(
    id: string,
    emotion: Partial<EmotionReadingEntity>,
  ): Promise<EmotionReadingEntity> {

    await this.repository.update(
      {
        reading_id: id,
      },
      {
        session_id: emotion.sessionId,
        elapsed_ms_total: emotion.elapsedMsTotal,
        timestamp_real: emotion.timestampReal,
        dominant_emotion: emotion.dominantEmotion,
        scores_json: emotion.scoresJson,
      },
    );

    const updated = await this.repository.findOneBy({
      reading_id: id,
    });

    if (!updated) {
      throw new Error('Emotion reading no encontrada');
    }

    return EmotionReadingMapper.toDomain(updated);

  }

  async delete(
    id: string,
  ): Promise<void> {

    await this.repository.delete({
      reading_id: id,
    });

  }

}