import { Questionnaire } from '../../domain/entities/questionnaire.entity';

import { QuestionnaireTypeormEntity } from './questionnaire.typeorm.entity';

export class QuestionnaireOrmMapper {

  static toPersistence(
    questionnaire: Questionnaire,
  ): QuestionnaireTypeormEntity {

    const orm =
      new QuestionnaireTypeormEntity();

    orm.questionnaire_id =
      questionnaire.questionnaireId;

    orm.project_id =
      questionnaire.projectId;

    orm.type =
      questionnaire.type;

    orm.title =
      questionnaire.title;

    orm.description =
      questionnaire.description;

    orm.created_at = questionnaire.createdAt ?? new Date();

    return orm;
  }

}