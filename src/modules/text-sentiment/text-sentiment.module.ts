import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TextSentimentOrmEntity } from './infrastructure/typeorm/text-sentiment.orm-entity';

import { TextSentimentRepository } from './domain/interfaces/text-sentiment.repository';

import { TypeOrmTextSentimentRepository } from './infrastructure/repositories/typeorm-text-sentiment.repository.impl';

import { TextSentimentController } from './presentation/controllers/text-sentiment.controller';

import { CreateTextSentimentUseCase } from './application/use-cases/create-text-sentiment.use-case';
import { UpdateTextSentimentUseCase } from './application/use-cases/update-text-sentiment.use-case';
import { DeleteTextSentimentUseCase } from './application/use-cases/delete-text-sentiment.use-case';
import { FindAllTextSentimentsUseCase } from './application/use-cases/find-all-text-sentiments.use-case';
import { FindTextSentimentByIdUseCase } from './application/use-cases/find-text-sentiment-by-id.use-case';
import { FindTextSentimentsBySessionUseCase } from './application/use-cases/find-text-sentiments-by-session.use-case';
import { FindTextSentimentsByAuthorUseCase } from './application/use-cases/find-text-sentiments-by-author.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TextSentimentOrmEntity,
    ]),
  ],

  controllers: [
    TextSentimentController,
  ],

  providers: [
    CreateTextSentimentUseCase,
    UpdateTextSentimentUseCase,
    DeleteTextSentimentUseCase,
    FindAllTextSentimentsUseCase,
    FindTextSentimentByIdUseCase,
    FindTextSentimentsBySessionUseCase,
    FindTextSentimentsByAuthorUseCase,

    {
      provide: TextSentimentRepository,
      useClass: TypeOrmTextSentimentRepository,
    },
  ],

  exports: [
    CreateTextSentimentUseCase,
    UpdateTextSentimentUseCase,
    DeleteTextSentimentUseCase,
    FindAllTextSentimentsUseCase,
    FindTextSentimentByIdUseCase,
    FindTextSentimentsBySessionUseCase,
    FindTextSentimentsByAuthorUseCase,
    TextSentimentRepository,
  ],
})
export class TextSentimentModule {}