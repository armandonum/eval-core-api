import { QuestionnaireResponse } from '../../domain/entities/questionnaire-response.entity';

import { QuestionnaireResponseTypeormEntity } from './questionnaire-response.typeorm.entity';

export class QuestionnaireResponseMapper {

  static toDomain(
    orm: QuestionnaireResponseTypeormEntity,
  ): QuestionnaireResponse {

    return new QuestionnaireResponse(
      orm.response_id,
      orm.questionnaire_id,
      orm.participant_id,
      orm.session_id,
      orm.submitted_at,
    );
  }

  static toDomainList(
    list: QuestionnaireResponseTypeormEntity[],
  ): QuestionnaireResponse[] {

    return list.map(item =>
      this.toDomain(item),
    );
  }

}