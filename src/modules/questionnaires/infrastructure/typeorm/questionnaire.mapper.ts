import { Questionnaire } from '../../domain/entities/questionnaire.entity';

export class QuestionnaireMapper {

  static toDomain(
    orm: any,
  ): Questionnaire {

    return new Questionnaire(
      orm.questionnaire_id,
      orm.project_id,
      orm.type,
      orm.title,
      orm.description,
      orm.created_at,
    );
  }

  static toDomainList(
    list: any[],
  ): Questionnaire[] {

    return list.map(
      this.toDomain,
    );
  }

}