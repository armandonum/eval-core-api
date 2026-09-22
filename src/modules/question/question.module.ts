import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionController } from './presentation/controllers/question.controller';

import { QuestionTypeormEntity } from './infrastructure/typeorm/question.typeorm.entity';

import { QuestionRepositoryImpl } from './infrastructure/repositories/question.repository.impl';

import { CreateQuestionUseCase } from './application/use-cases/create-question.use-case';
import { UpdateQuestionUseCase } from './application/use-cases/update-question.use-case';
import { DeleteQuestionUseCase } from './application/use-cases/delete-question.use-case';
import { FindQuestionUseCase } from './application/use-cases/find-question.use-case';
import { FindAllQuestionsUseCase } from './application/use-cases/find-all-questions.use-case';
import { FindQuestionsByQuestionnaireUseCase } from './application/use-cases/find-questions-by-questionnaire.use-case';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionTypeormEntity,
    ]),
  ],

  controllers: [
    QuestionController,
  ],

  providers: [
    {
      provide:
        INJECTION_TOKENS.QUESTION_REPOSITORY,
      useClass:
        QuestionRepositoryImpl,
    },

    CreateQuestionUseCase,
    UpdateQuestionUseCase,
    DeleteQuestionUseCase,
    FindQuestionUseCase,
    FindAllQuestionsUseCase,
    FindQuestionsByQuestionnaireUseCase,
  ],

  exports: [
    {
      provide:
        INJECTION_TOKENS.QUESTION_REPOSITORY,
      useClass:
        QuestionRepositoryImpl,
    },
  ],
})
export class QuestionModule {}