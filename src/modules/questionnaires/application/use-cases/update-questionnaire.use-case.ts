import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { QuestionnaireRepository } from '../../domain/interfaces/questionnaire.repository';

import { UpdateQuestionnaireDto } from '../dtos/update-questionnaire.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateQuestionnaireUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTIONNAIRE_REPOSITORY)
    private readonly repository: QuestionnaireRepository,
  ) {}

  async execute(
    questionnaireId: string,
    dto: UpdateQuestionnaireDto,
  ) {

    const questionnaire =
      await this.repository.findById(questionnaireId);

    if (!questionnaire) {
      throw new NotFoundException(
        'Questionnaire not found',
      );
    }

    questionnaire.update(dto);

    return this.repository.update(questionnaire);
  }
}