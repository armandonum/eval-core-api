import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { EmotionReadingEntity } from '../../domain/entities/emotion-reading.entity';
import type {  EmotionReadingRepository} from '../../domain/interfaces/emotion-reading.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

import { CreateEmotionReadingDto } from '../dtos/create-emotion-reading.dto';

@Injectable()
export class CreateEmotionReadingUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.EMOTION_READING_REPOSITORY)
    private readonly repository: EmotionReadingRepository,
  ) {}

  async execute(
    dto: CreateEmotionReadingDto,
  ): Promise<EmotionReadingEntity> {

    const emotion = new EmotionReadingEntity(
      uuid(),
      dto.sessionId,
      dto.elapsedMsTotal,
      new Date(dto.timestampReal),
      dto.dominantEmotion,
      dto.scoresJson,
    );

    return this.repository.create(emotion);

  }

}