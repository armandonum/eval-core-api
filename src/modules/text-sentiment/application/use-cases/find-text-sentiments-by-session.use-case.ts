import { Injectable } from '@nestjs/common';

import { TextSentimentRepository } from '../../domain/interfaces/text-sentiment.repository';

@Injectable()
export class FindTextSentimentsBySessionUseCase {
  constructor(
    private readonly repository: TextSentimentRepository,
  ) {}

  execute(sessionId: string) {
    return this.repository.findBySessionId(
      sessionId,
    );
  }
}