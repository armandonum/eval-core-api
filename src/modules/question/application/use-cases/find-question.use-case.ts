import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { QuestionRepository } from '../../domain/interfaces/question.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindQuestionUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_REPOSITORY)
    private readonly repository: QuestionRepository,
  ) {}

  async execute(
    questionId: string,
  ) {

    const question =
      await this.repository.findById(questionId);

    if (!question) {
      throw new NotFoundException(
        'Question not found',
      );
    }

    return question;
  }
}