import { QuestionOption } from '../../domain/entities/question-option.entity';

import { QuestionOptionTypeormEntity } from './question-option.typeorm.entity';

export class QuestionOptionOrmMapper {

  static toPersistence(
    option: QuestionOption,
  ): QuestionOptionTypeormEntity {

    const orm =
      new QuestionOptionTypeormEntity();

    orm.option_id =
      option.optionId;

    orm.question_id =
      option.questionId;

    orm.label =
      option.label;

    orm.order_index =
      option.orderIndex;

    return orm;
  }

}