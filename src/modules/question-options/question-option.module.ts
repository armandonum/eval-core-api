import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionOptionController } from './presentation/controllers/question-option.controller';

import { QuestionOptionTypeormEntity } from './infrastructure/typeorm/question-option.typeorm.entity';

import { QuestionOptionRepositoryImpl } from './infrastructure/repositories/question-option.repository.impl';

import { CreateQuestionOptionUseCase } from './application/use-cases/create-question-option.use-case';
import { UpdateQuestionOptionUseCase } from './application/use-cases/update-question-option.use-case';
import { DeleteQuestionOptionUseCase } from './application/use-cases/delete-question-option.use-case';
import { FindQuestionOptionUseCase } from './application/use-cases/find-question-option.use-case';
import { FindAllQuestionOptionsUseCase } from './application/use-cases/find-all-question-options.use-case';
import { FindQuestionOptionsByQuestionUseCase } from './application/use-cases/find-question-options-by-question.use-case';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionOptionTypeormEntity,
    ]),
  ],

  controllers: [
    QuestionOptionController,
  ],

  providers: [
    {
      provide: INJECTION_TOKENS.QUESTION_OPTION_REPOSITORY,
      useClass: QuestionOptionRepositoryImpl,
    },

    CreateQuestionOptionUseCase,
    UpdateQuestionOptionUseCase,
    DeleteQuestionOptionUseCase,
    FindQuestionOptionUseCase,
    FindAllQuestionOptionsUseCase,
    FindQuestionOptionsByQuestionUseCase,
  ],

  exports: [
    {
      provide: INJECTION_TOKENS.QUESTION_OPTION_REPOSITORY,
      useClass: QuestionOptionRepositoryImpl,
    },
  ],
})
export class QuestionOptionModule {}