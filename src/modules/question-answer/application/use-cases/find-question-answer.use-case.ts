import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { QuestionAnswerRepository } from '../../domain/interfaces/question-answer.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindQuestionAnswerUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_ANSWER_REPOSITORY)
    private readonly repository: QuestionAnswerRepository,
  ) {}

  async execute(
    answerId: string,
  ) {
    const answer =
      await this.repository.findById(answerId);

    if (!answer) {
      throw new NotFoundException(
        'Question answer not found',
      );
    }

    return answer;
  }
}