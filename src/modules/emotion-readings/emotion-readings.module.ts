import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmotionReadingTypeormEntity } from './infrastructure/typeorm/emotion-reading.typeorm.entity';

import { EmotionReadingRepositoryImpl } from './infrastructure/repositories/emotion-reading.repository.impl';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';


import { CreateEmotionReadingUseCase } from './application/use-cases/create-emotion-reading.use-case';
import { FindEmotionReadingUseCase } from './application/use-cases/find-emotion-reading.use-case';
import { FindAllEmotionReadingsUseCase } from './application/use-cases/find-all-emotion-readings.use-case';
import { FindEmotionReadingsBySessionUseCase } from './application/use-cases/find-by-session.use-case';
import { UpdateEmotionReadingUseCase } from './application/use-cases/update-emotion-reading.use-case';
import { DeleteEmotionReadingUseCase } from './application/use-cases/delete-emotion-reading.use-case';

import { EmotionReadingController } from './presentation/controllers/emotion-reading.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmotionReadingTypeormEntity,
    ]),
  ],

  controllers: [
    EmotionReadingController,
  ],

  providers: [

    {
      provide: INJECTION_TOKENS.EMOTION_READING_REPOSITORY,
      useClass: EmotionReadingRepositoryImpl,
    },

    CreateEmotionReadingUseCase,
    FindEmotionReadingUseCase,
    FindAllEmotionReadingsUseCase,
    FindEmotionReadingsBySessionUseCase,
    UpdateEmotionReadingUseCase,
    DeleteEmotionReadingUseCase,

  ],

  exports: [
    INJECTION_TOKENS.EMOTION_READING_REPOSITORY,
  ],

})
export class EmotionReadingsModule {}