import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Questionnaire } from '../../domain/entities/questionnaire.entity';
import type { QuestionnaireRepository } from '../../domain/interfaces/questionnaire.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindQuestionnaireByProjectAndTypeUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTIONNAIRE_REPOSITORY)
    private readonly questionnaireRepository: QuestionnaireRepository,
  ) {}

  async execute(
    projectId: string,
    type: string,
  ): Promise<Questionnaire> {

    const questionnaire =
      await this.questionnaireRepository.findByProjectAndType(
        projectId,
        type,
      );

    if (!questionnaire) {
      throw new NotFoundException(
        `No existe un cuestionario de tipo "${type}" para el proyecto ${projectId}`,
      );
    }

    return questionnaire;
  }
}