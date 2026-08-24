import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { QuestionOptionRepository } from '../../domain/interfaces/question-option.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindQuestionOptionUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_OPTION_REPOSITORY)
    private readonly repository: QuestionOptionRepository,
  ) {}

  async execute(
    optionId: string,
  ) {

    const option =
      await this.repository.findById(optionId);

    if (!option) {
      throw new NotFoundException(
        'Question option not found',
      );
    }

    return option;
  }
}