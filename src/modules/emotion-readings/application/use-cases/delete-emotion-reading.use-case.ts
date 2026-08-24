import {
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';

import type{  EmotionReadingRepository} from '../../domain/interfaces/emotion-reading.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class DeleteEmotionReadingUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.EMOTION_READING_REPOSITORY)
    private readonly repository: EmotionReadingRepository,
  ) {}

  async execute(id: string): Promise<void> {

    const emotion = await this.repository.findById(id);

    if (!emotion) {
      throw new NotFoundException(
        'Emotion Reading no encontrada',
      );
    }

    await this.repository.delete(id);

  }

}