import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type { QuestionRepository } from '../../domain/interfaces/question.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindAllQuestionsUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_REPOSITORY)
    private readonly repository: QuestionRepository,
  ) {}

  async execute() {
    return this.repository.findAll();
  }
}