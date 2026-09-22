import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type { QuestionAnswerRepository } from '../../domain/interfaces/question-answer.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindAllQuestionAnswersUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_ANSWER_REPOSITORY)
    private readonly repository: QuestionAnswerRepository,
  ) {}

  async execute() {
    return this.repository.findAll();
  }
}