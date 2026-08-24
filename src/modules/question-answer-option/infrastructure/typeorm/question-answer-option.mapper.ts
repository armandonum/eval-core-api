import { QuestionAnswerOption } from '../../domain/entities/question-answer-option.entity';
import { QuestionAnswerOptionTypeormEntity } from './question-answer-option.typeorm.entity';

export class QuestionAnswerOptionMapper {

  static toDomain(
    orm: QuestionAnswerOptionTypeormEntity,
  ): QuestionAnswerOption {

    return new QuestionAnswerOption(
      orm.answer_id,
      orm.option_id,
    );
  }

  static toDomainList(
    ormList: QuestionAnswerOptionTypeormEntity[],
  ): QuestionAnswerOption[] {

    return ormList.map(this.toDomain);
  }

  static toPersistence(
    domain: QuestionAnswerOption,
  ): QuestionAnswerOptionTypeormEntity {

    const orm =
      new QuestionAnswerOptionTypeormEntity();

    orm.answer_id =
      domain.answerId;

    orm.option_id =
      domain.optionId;

    return orm;
  }
}