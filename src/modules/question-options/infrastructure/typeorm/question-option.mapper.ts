import { QuestionOption } from '../../domain/entities/question-option.entity';

import { QuestionOptionTypeormEntity } from './question-option.typeorm.entity';

export class QuestionOptionMapper {

  static toDomain(
    orm: QuestionOptionTypeormEntity,
  ): QuestionOption {

    return new QuestionOption(
      orm.option_id,
      orm.question_id,
      orm.label,
      orm.order_index,
    );
  }

  static toDomainList(
    list: QuestionOptionTypeormEntity[],
  ): QuestionOption[] {

    return list.map(item =>
      this.toDomain(item),
    );
  }

}