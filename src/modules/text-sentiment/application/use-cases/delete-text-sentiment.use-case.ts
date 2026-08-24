import { Injectable } from '@nestjs/common';

import { TextSentimentRepository } from '../../domain/interfaces/text-sentiment.repository';

@Injectable()
export class DeleteTextSentimentUseCase {
  constructor(
    private readonly repository: TextSentimentRepository,
  ) {}

  execute(sentimentId: string) {
    return this.repository.delete(sentimentId);
  }
}