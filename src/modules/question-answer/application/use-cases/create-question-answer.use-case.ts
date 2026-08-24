import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { QuestionAnswer } from '../../domain/entities/question-answer.entity';
import type { QuestionAnswerRepository } from '../../domain/interfaces/question-answer.repository';

import { CreateQuestionAnswerDto } from '../dtos/create-question-answer.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateQuestionAnswerUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_ANSWER_REPOSITORY)
    private readonly repository: QuestionAnswerRepository,
  ) {}

  async execute(
    dto: CreateQuestionAnswerDto,
  ) {
    const answer = QuestionAnswer.create({
      answerId: randomUUID(),
      responseId: dto.responseId,
      questionId: dto.questionId,
      answerText: dto.answerText,
      selectedOptionId: dto.selectedOptionId,
      scaleValue: dto.scaleValue,
      booleanValue: dto.booleanValue,
      isNotApplicable: dto.isNotApplicable,
    });

    return this.repository.create(answer);
  }
}