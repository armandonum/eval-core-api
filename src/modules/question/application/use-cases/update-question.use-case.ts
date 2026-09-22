import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { QuestionRepository } from '../../domain/interfaces/question.repository';

import { UpdateQuestionDto } from '../dtos/update-question.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateQuestionUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_REPOSITORY)
    private readonly repository: QuestionRepository,
  ) {}

  async execute(
    questionId: string,
    dto: UpdateQuestionDto,
  ) {

    const question =
      await this.repository.findById(questionId);

    if (!question) {
      throw new NotFoundException(
        'Question not found',
      );
    }

    question.update(dto);

    return this.repository.update(question);
  }
}