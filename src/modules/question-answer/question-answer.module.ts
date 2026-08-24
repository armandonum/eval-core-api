import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionAnswerController } from './presentation/controllers/question-answer.controller';

import { QuestionAnswerTypeormEntity } from './infrastructure/typeorm/question-answer.typeorm.entity';

import { QuestionAnswerRepositoryImpl } from './infrastructure/repositories/question-answer.repository.impl';

import { CreateQuestionAnswerUseCase } from './application/use-cases/create-question-answer.use-case';
import { UpdateQuestionAnswerUseCase } from './application/use-cases/update-question-answer.use-case';
import { DeleteQuestionAnswerUseCase } from './application/use-cases/delete-question-answer.use-case';

import { FindQuestionAnswerUseCase } from './application/use-cases/find-question-answer.use-case';
import { FindAllQuestionAnswersUseCase } from './application/use-cases/find-all-question-answers.use-case';

import { FindQuestionAnswersByResponseUseCase } from './application/use-cases/find-question-answers-by-response.use-case';
import { FindQuestionAnswersByQuestionUseCase } from './application/use-cases/find-question-answers-by-question.use-case';
import { FindQuestionAnswerByResponseQuestionUseCase } from './application/use-cases/find-question-answer-by-response-question.use-case';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionAnswerTypeormEntity,
    ]),
  ],

  controllers: [
    QuestionAnswerController,
  ],

  providers: [
    {
      provide:
        INJECTION_TOKENS.QUESTION_ANSWER_REPOSITORY,
      useClass:
        QuestionAnswerRepositoryImpl,
    },

    CreateQuestionAnswerUseCase,
    UpdateQuestionAnswerUseCase,
    DeleteQuestionAnswerUseCase,

    FindQuestionAnswerUseCase,
    FindAllQuestionAnswersUseCase,

    FindQuestionAnswersByResponseUseCase,
    FindQuestionAnswersByQuestionUseCase,
    FindQuestionAnswerByResponseQuestionUseCase,
  ],

  exports: [
    {
      provide:
        INJECTION_TOKENS.QUESTION_ANSWER_REPOSITORY,
      useClass:
        QuestionAnswerRepositoryImpl,
    },
  ],
})
export class QuestionAnswerModule {}