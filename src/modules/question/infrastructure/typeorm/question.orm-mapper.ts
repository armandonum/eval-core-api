import { Question } from '../../domain/entities/question.entity';
import { QuestionType } from '../../domain/enums/question-type.enum';
import { QuestionTypeormEntity } from './question.typeorm.entity';

export class QuestionOrmMapper {
  static toDomain(
    orm: QuestionTypeormEntity,
  ): Question {
    return new Question(
      orm.question_id,
      orm.questionnaire_id,
      orm.order_index,
      orm.question_text,
      orm.question_type as QuestionType,
      orm.is_required,
      orm.scale_min,
      orm.scale_max,
      orm.allow_not_applicable,
      orm.created_at,
    );
  }

  static toDomainList(
    orm: QuestionTypeormEntity[],
  ): Question[] {
    return orm.map((item) =>
      this.toDomain(item),
    );
  }

  static toPersistence(
    domain: Question,
  ): QuestionTypeormEntity {
    const orm = new QuestionTypeormEntity();

    orm.question_id = domain.questionId;
    orm.questionnaire_id =
      domain.questionnaireId;
    orm.order_index = domain.orderIndex;
    orm.question_text = domain.questionText;
    orm.question_type =
      domain.questionType;
    orm.is_required =
      domain.isRequired;
    orm.scale_min =
      domain.scaleMin;
    orm.scale_max =
      domain.scaleMax;
    orm.allow_not_applicable =
      domain.allowNotApplicable;

    return orm;
  }
}