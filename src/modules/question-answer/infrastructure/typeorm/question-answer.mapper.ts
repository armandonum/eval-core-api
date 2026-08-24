import { QuestionAnswer } from '../../domain/entities/question-answer.entity';
import { QuestionAnswerTypeormEntity } from './question-answer.typeorm.entity';

export class QuestionAnswerMapper {

  static toDomain(
    orm: QuestionAnswerTypeormEntity,
  ): QuestionAnswer {

    return new QuestionAnswer(
      orm.answer_id,
      orm.response_id,
      orm.question_id,
      orm.answer_text,
      orm.selected_option_id,
      orm.scale_value,
      orm.boolean_value,
      orm.is_not_applicable,
      orm.created_at,
    );
  }

  static toDomainList(
    ormList: QuestionAnswerTypeormEntity[],
  ): QuestionAnswer[] {

    return ormList.map(this.toDomain);
  }

  static toPersistence(
    domain: QuestionAnswer,
  ): QuestionAnswerTypeormEntity {

    const orm =
      new QuestionAnswerTypeormEntity();

    orm.answer_id =
      domain.answerId;

    orm.response_id =
      domain.responseId;

    orm.question_id =
      domain.questionId;

    orm.answer_text =
      domain.answerText;

    orm.selected_option_id =
      domain.selectedOptionId;

    orm.scale_value =
      domain.scaleValue;

    orm.boolean_value =
      domain.booleanValue;

    orm.is_not_applicable =
      domain.isNotApplicable;

    orm.created_at =
      domain.createdAt;

    return orm;
  }
}