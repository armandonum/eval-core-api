import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionAnswerOptionController } from './presentation/controllers/question-answer-option.controller';

import { QuestionAnswerOptionTypeormEntity } from './infrastructure/typeorm/question-answer-option.typeorm.entity';

import { QuestionAnswerOptionRepositoryImpl } from './infrastructure/repositories/question-answer-option.repository.impl';

import { CreateQuestionAnswerOptionUseCase } from './application/use-cases/create-question-answer-option.use-case';
import { DeleteQuestionAnswerOptionUseCase } from './application/use-cases/delete-question-answer-option.use-case';
import { FindOptionsByAnswerUseCase } from './application/use-cases/find-options-by-answer.use-case';
import { FindAnswersByOptionUseCase } from './application/use-cases/find-answers-by-option.use-case';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionAnswerOptionTypeormEntity,
    ]),
  ],

  controllers: [
    QuestionAnswerOptionController,
  ],

  providers: [
    {
      provide:
        INJECTION_TOKENS.QUESTION_ANSWER_OPTION_REPOSITORY,
      useClass:
        QuestionAnswerOptionRepositoryImpl,
    },

    CreateQuestionAnswerOptionUseCase,
    DeleteQuestionAnswerOptionUseCase,
    FindOptionsByAnswerUseCase,
    FindAnswersByOptionUseCase,
  ],

  exports: [
    {
      provide:
        INJECTION_TOKENS.QUESTION_ANSWER_OPTION_REPOSITORY,
      useClass:
        QuestionAnswerOptionRepositoryImpl,
    },
  ],
})
export class QuestionAnswerOptionModule {}