import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { Questionnaire } from '../../domain/entities/questionnaire.entity';
import type { QuestionnaireRepository } from '../../domain/interfaces/questionnaire.repository';

import { CreateQuestionnaireDto } from '../dtos/create-questionnaire.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateQuestionnaireUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTIONNAIRE_REPOSITORY)
    private readonly repository: QuestionnaireRepository,
  ) {}

  async execute(
    dto: CreateQuestionnaireDto,
  ) {
    const questionnaire =
      Questionnaire.create({
        projectId: dto.projectId,
        type: dto.type,
        title: dto.title,
        description: dto.description,
      });
      
    return this.repository.create(questionnaire);
  }
}