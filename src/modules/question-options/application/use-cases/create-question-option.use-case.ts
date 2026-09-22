import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { CreateQuestionOptionDto } from '../dtos/create-question-option.dto';

import { QuestionOption } from '../../domain/entities/question-option.entity';
import type { QuestionOptionRepository } from '../../domain/interfaces/question-option.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateQuestionOptionUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_OPTION_REPOSITORY)
    private readonly repository: QuestionOptionRepository,
  ) {}

  async execute(
    dto: CreateQuestionOptionDto,
  ) {

    const option =
      QuestionOption.create({
        optionId: randomUUID(),
        questionId: dto.questionId,
        label: dto.label,
        orderIndex: dto.orderIndex,
      });

    return this.repository.create(option);
  }
}