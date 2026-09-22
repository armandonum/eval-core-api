import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type { QuestionnaireResponseRepository } from '../../domain/interfaces/questionnaire-response.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindResponsesByQuestionnaireUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTIONNAIRE_RESPONSE_REPOSITORY)
    private readonly repository: QuestionnaireResponseRepository,
  ) {}

  async execute(
    questionnaireId: string,
  ) {
    return this.repository.findByQuestionnaireId(
      questionnaireId,
    );
  }
}