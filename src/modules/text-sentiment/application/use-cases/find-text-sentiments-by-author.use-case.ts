import { Injectable } from '@nestjs/common';

import { TextSentimentRepository } from '../../domain/interfaces/text-sentiment.repository';

@Injectable()
export class FindTextSentimentsByAuthorUseCase {
  constructor(
    private readonly repository: TextSentimentRepository,
  ) {}

  execute(authorId: string) {
    return this.repository.findByAuthorId(
      authorId,
    );
  }
}