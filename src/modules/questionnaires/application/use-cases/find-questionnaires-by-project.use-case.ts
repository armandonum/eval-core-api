import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type{ QuestionnaireRepository } from '../../domain/interfaces/questionnaire.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindQuestionnairesByProjectUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTIONNAIRE_REPOSITORY)
    private readonly repository: QuestionnaireRepository,
  ) {}

  async execute(
    projectId: string,
  ) {
    return this.repository.findByProjectId(projectId);
  }
}