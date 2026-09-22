import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateQuestionOptionDto } from '../dtos/update-question-option.dto';

import type { QuestionOptionRepository } from '../../domain/interfaces/question-option.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateQuestionOptionUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_OPTION_REPOSITORY)
    private readonly repository: QuestionOptionRepository,
  ) {}

  async execute(
    optionId: string,
    dto: UpdateQuestionOptionDto,
  ) {

    const option =
      await this.repository.findById(optionId);

    if (!option) {
      throw new NotFoundException(
        'Question option not found',
      );
    }

    option.update(dto);

    return this.repository.update(option);
  }
}