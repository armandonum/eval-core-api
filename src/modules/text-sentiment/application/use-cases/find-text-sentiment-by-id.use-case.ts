import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TextSentimentRepository } from '../../domain/interfaces/text-sentiment.repository';

@Injectable()
export class FindTextSentimentByIdUseCase {
  constructor(
    private readonly repository: TextSentimentRepository,
  ) {}

  async execute(sentimentId: string) {
    const sentiment =
      await this.repository.findById(sentimentId);

    if (!sentiment) {
      throw new NotFoundException(
        'Text sentiment not found',
      );
    }

    return sentiment;
  }
}