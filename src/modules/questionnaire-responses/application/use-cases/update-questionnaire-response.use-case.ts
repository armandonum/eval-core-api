import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateQuestionnaireResponseDto } from '../dtos/update-questionnaire-response.dto';

import type { QuestionnaireResponseRepository } from '../../domain/interfaces/questionnaire-response.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateQuestionnaireResponseUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTIONNAIRE_RESPONSE_REPOSITORY)
    private readonly repository: QuestionnaireResponseRepository,
  ) {}

  async execute(
    responseId: string,
    dto: UpdateQuestionnaireResponseDto,
  ) {

    const response =
      await this.repository.findById(responseId);

    if (!response) {
      throw new NotFoundException(
        'Questionnaire response not found',
      );
    }

    response.update(dto);

    return this.repository.update(response);
  }
}