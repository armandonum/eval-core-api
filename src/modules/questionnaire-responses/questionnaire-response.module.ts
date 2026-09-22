import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionnaireResponseController } from './presentation/controllers/questionnaire-response.controller';

import { QuestionnaireResponseTypeormEntity } from './infrastructure/typeorm/questionnaire-response.typeorm.entity';

import { QuestionnaireResponseRepositoryImpl } from './infrastructure/repositories/questionnaire-response.repository.impl';

import { CreateQuestionnaireResponseUseCase } from './application/use-cases/create-questionnaire-response.use-case';
import { UpdateQuestionnaireResponseUseCase } from './application/use-cases/update-questionnaire-response.use-case';
import { DeleteQuestionnaireResponseUseCase } from './application/use-cases/delete-questionnaire-response.use-case';
import { FindQuestionnaireResponseUseCase } from './application/use-cases/find-questionnaire-response.use-case';
import { FindAllQuestionnaireResponsesUseCase } from './application/use-cases/find-all-questionnaire-responses.use-case';
import { FindResponsesByQuestionnaireUseCase } from './application/use-cases/find-responses-by-questionnaire.use-case';
import { FindResponsesByParticipantUseCase } from './application/use-cases/find-responses-by-participant.use-case';
import { FindResponseByQuestionnaireParticipantSessionUseCase } from './application/use-cases/find-response-by-questionnaire-participant-session.use-case';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionnaireResponseTypeormEntity,
    ]),
  ],

  controllers: [
    QuestionnaireResponseController,
  ],

  providers: [
    {
      provide:
        INJECTION_TOKENS.QUESTIONNAIRE_RESPONSE_REPOSITORY,
      useClass:
        QuestionnaireResponseRepositoryImpl,
    },

    CreateQuestionnaireResponseUseCase,
    UpdateQuestionnaireResponseUseCase,
    DeleteQuestionnaireResponseUseCase,
    FindQuestionnaireResponseUseCase,
    FindAllQuestionnaireResponsesUseCase,
    FindResponsesByQuestionnaireUseCase,
    FindResponsesByParticipantUseCase,
    FindResponseByQuestionnaireParticipantSessionUseCase,
  ],

  exports: [
    {
      provide:
        INJECTION_TOKENS.QUESTIONNAIRE_RESPONSE_REPOSITORY,
      useClass:
        QuestionnaireResponseRepositoryImpl,
    },
  ],
})
export class QuestionnaireResponseModule {}