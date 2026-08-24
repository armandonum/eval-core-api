import { QuestionnaireResponse } from '../../domain/entities/questionnaire-response.entity';

import { QuestionnaireResponseTypeormEntity } from './questionnaire-response.typeorm.entity';

export class QuestionnaireResponseOrmMapper {

  static toPersistence(
    response: QuestionnaireResponse,
  ): QuestionnaireResponseTypeormEntity {

    const orm =
      new QuestionnaireResponseTypeormEntity();

    orm.response_id =
      response.responseId;

    orm.questionnaire_id =
      response.questionnaireId;

    orm.participant_id =
      response.participantId;

    orm.session_id =
      response.sessionId;

    orm.submitted_at =
      response.submittedAt;

    return orm;
  }

}