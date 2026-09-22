import {
  Inject,
  Injectable,
  ConflictException,
} from '@nestjs/common';

import { QuestionAnswerOption } from '../../domain/entities/question-answer-option.entity';
import type { QuestionAnswerOptionRepository } from '../../domain/interfaces/question-answer-option.repository';

import { CreateQuestionAnswerOptionDto } from '../dtos/create-question-answer-option.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateQuestionAnswerOptionUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_ANSWER_OPTION_REPOSITORY)
    private readonly repository: QuestionAnswerOptionRepository,
  ) {}

  async execute(
    dto: CreateQuestionAnswerOptionDto,
  ) {

    const exists =
      await this.repository.exists(
        dto.answerId,
        dto.optionId,
      );

    if (exists) {
      throw new ConflictException(
        'Option already selected',
      );
    }

    const relation =
      QuestionAnswerOption.create({
        answerId: dto.answerId,
        optionId: dto.optionId,
      });

    return this.repository.create(
      relation,
    );
  }
}