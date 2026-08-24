import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionnaireController } from './presentation/controllers/questionnaire.controller';

import { QuestionnaireTypeormEntity } from './infrastructure/typeorm/questionnaire.typeorm.entity';

import { QuestionnaireRepositoryImpl } from './infrastructure/repositories/questionnaire.repository.impl';

import { CreateQuestionnaireUseCase } from './application/use-cases/create-questionnaire.use-case';
import { UpdateQuestionnaireUseCase } from './application/use-cases/update-questionnaire.use-case';
import { DeleteQuestionnaireUseCase } from './application/use-cases/delete-questionnaire.use-case';
import { FindQuestionnaireUseCase } from './application/use-cases/find-questionnaire.use-case';
import { FindAllQuestionnairesUseCase } from './application/use-cases/find-all-questionnaires.use-case';
import { FindQuestionnairesByProjectUseCase } from './application/use-cases/find-questionnaires-by-project.use-case';
import { FindQuestionnaireByProjectAndTypeUseCase } from './application/use-cases/find-questionnaire-by-project-and-type.use-case';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionnaireTypeormEntity,
    ]),
  ],

  controllers: [
    QuestionnaireController,
  ],

  providers: [
    {
      provide:
        INJECTION_TOKENS.QUESTIONNAIRE_REPOSITORY,
      useClass:
        QuestionnaireRepositoryImpl,
    },

    CreateQuestionnaireUseCase,
    UpdateQuestionnaireUseCase,
    DeleteQuestionnaireUseCase,
    FindQuestionnaireUseCase,
    FindAllQuestionnairesUseCase,
    FindQuestionnairesByProjectUseCase,
    FindQuestionnaireByProjectAndTypeUseCase,
  ],

  exports: [
    {
      provide:
        INJECTION_TOKENS.QUESTIONNAIRE_REPOSITORY,
      useClass:
        QuestionnaireRepositoryImpl,
    },
  ],
})
export class QuestionnaireModule {}