import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { QuestionnaireResponseRepository } from '../../domain/interfaces/questionnaire-response.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindQuestionnaireResponseUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTIONNAIRE_RESPONSE_REPOSITORY)
    private readonly repository: QuestionnaireResponseRepository,
  ) {}

  async execute(
    responseId: string,
  ) {

    const response =
      await this.repository.findById(responseId);

    if (!response) {
      throw new NotFoundException(
        'Questionnaire response not found',
      );
    }

    return response;
  }
}