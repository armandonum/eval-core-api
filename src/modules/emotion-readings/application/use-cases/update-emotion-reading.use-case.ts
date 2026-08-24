import {
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';

import type{  EmotionReadingRepository,} from '../../domain/interfaces/emotion-reading.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

import { UpdateEmotionReadingDto } from '../dtos/update-emotion-reading.dto';

@Injectable()
export class UpdateEmotionReadingUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.EMOTION_READING_REPOSITORY)
    private readonly repository: EmotionReadingRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateEmotionReadingDto,
  ) {

    const emotion = await this.repository.findById(id);

    if (!emotion) {
      throw new NotFoundException(
        'Emotion Reading no encontrada',
      );
    }

    return this.repository.update(id, {
      elapsedMsTotal: dto.elapsedMsTotal,
      timestampReal: dto.timestampReal
        ? new Date(dto.timestampReal)
        : undefined,
      dominantEmotion: dto.dominantEmotion,
      scoresJson: dto.scoresJson,
    });

  }

}