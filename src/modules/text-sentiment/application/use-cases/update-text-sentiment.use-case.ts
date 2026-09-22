import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateTextSentimentDto } from '../dtos/update-text-sentiment.dto';

import { TextSentimentRepository } from '../../domain/interfaces/text-sentiment.repository';

@Injectable()
export class UpdateTextSentimentUseCase {
  constructor(
    private readonly repository: TextSentimentRepository,
  ) {}

  async execute(
    sentimentId: string,
    dto: UpdateTextSentimentDto,
  ) {
    const sentiment =
      await this.repository.findById(sentimentId);

    if (!sentiment) {
      throw new NotFoundException(
        'Text sentiment not found',
      );
    }

    sentiment.update(dto);

    return this.repository.update(sentiment);
  }
}