import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type{ QuestionnaireRepository } from '../../domain/interfaces/questionnaire.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class DeleteQuestionnaireUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTIONNAIRE_REPOSITORY)
    private readonly repository: QuestionnaireRepository,
  ) {}

  async execute(
    questionnaireId: string,
  ) {

    const questionnaire =
      await this.repository.findById(questionnaireId);

    if (!questionnaire) {
      throw new NotFoundException(
        'Questionnaire not found',
      );
    }

    await this.repository.delete(questionnaireId);
  }
}