import { Injectable, Inject } from '@nestjs/common';

import type{  EmotionReadingRepository,} from '../../domain/interfaces/emotion-reading.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindEmotionReadingsBySessionUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.EMOTION_READING_REPOSITORY)
    private readonly repository: EmotionReadingRepository,
  ) {}

  async execute(sessionId: string) {
    return this.repository.findBySession(sessionId);
  }

}