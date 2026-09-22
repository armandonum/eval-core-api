import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type { QuestionRepository } from '../../domain/interfaces/question.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindQuestionsByQuestionnaireUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_REPOSITORY)
    private readonly repository: QuestionRepository,
  ) {}

  async execute(
    questionnaireId: string,
  ) {

    return this.repository.findByQuestionnaireId(
      questionnaireId,
    );
  }
}