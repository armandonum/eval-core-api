import { Injectable } from '@nestjs/common';

import { TextSentimentRepository } from '../../domain/interfaces/text-sentiment.repository';

@Injectable()
export class FindAllTextSentimentsUseCase {
  constructor(
    private readonly repository: TextSentimentRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}