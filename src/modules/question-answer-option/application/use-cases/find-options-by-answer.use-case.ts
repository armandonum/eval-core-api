import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type { QuestionAnswerOptionRepository } from '../../domain/interfaces/question-answer-option.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindOptionsByAnswerUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_ANSWER_OPTION_REPOSITORY)
    private readonly repository: QuestionAnswerOptionRepository,
  ) {}

  async execute(
    answerId: string,
  ) {
    return this.repository.findByAnswer(
      answerId,
    );
  }
}