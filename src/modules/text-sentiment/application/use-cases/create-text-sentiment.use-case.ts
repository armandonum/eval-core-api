import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateTextSentimentDto } from '../dtos/create-text-sentiment.dto';

import { TextSentiment } from '../../domain/entities/text-sentiment.entity';
import { TextSentimentRepository } from '../../domain/interfaces/text-sentiment.repository';

@Injectable()
export class CreateTextSentimentUseCase {
  constructor(
    private readonly repository: TextSentimentRepository,
  ) {}

  execute(dto: CreateTextSentimentDto) {
    const sentiment = new TextSentiment(
      uuid(),
      dto.sessionId ?? null,
      dto.text,
      dto.originalLabel,
      dto.uxLabel,
      dto.confidence,
      dto.scoresJson,
      dto.elapsedMsTotal ?? 0,
      dto.timestampReal ?? new Date(),
      new Date(),
      new Date(),
      dto.authorId ?? null,
    );

    return this.repository.create(sentiment);
  }
}