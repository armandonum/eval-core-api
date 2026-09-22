import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { QuestionAnswerRepository } from '../../domain/interfaces/question-answer.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindQuestionAnswerByResponseQuestionUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_ANSWER_REPOSITORY)
    private readonly repository: QuestionAnswerRepository,
  ) {}

  async execute(
    responseId: string,
    questionId: string,
  ) {
    const answer =
      await this.repository.findByResponseAndQuestion(
        responseId,
        questionId,
      );

    if (!answer) {
      throw new NotFoundException(
        'Question answer not found',
      );
    }

    return answer;
  }
}