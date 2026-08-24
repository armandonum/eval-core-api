import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type { QuestionOptionRepository } from '../../domain/interfaces/question-option.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindQuestionOptionsByQuestionUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_OPTION_REPOSITORY)
    private readonly repository: QuestionOptionRepository,
  ) {}

  async execute(
    questionId: string,
  ) {
    return this.repository.findByQuestionId(
      questionId,
    );
  }
}