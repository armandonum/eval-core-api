import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { QuestionAnswerRepository } from '../../domain/interfaces/question-answer.repository';

import { UpdateQuestionAnswerDto } from '../dtos/update-question-answer.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateQuestionAnswerUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_ANSWER_REPOSITORY)
    private readonly repository: QuestionAnswerRepository,
  ) {}

  async execute(
    answerId: string,
    dto: UpdateQuestionAnswerDto,
  ) {
    const answer =
      await this.repository.findById(answerId);

    if (!answer) {
      throw new NotFoundException(
        'Question answer not found',
      );
    }

    answer.update(dto);

    return this.repository.update(answer);
  }
}