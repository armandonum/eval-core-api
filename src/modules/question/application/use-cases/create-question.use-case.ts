import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { Question } from '../../domain/entities/question.entity';
import type{ QuestionRepository } from '../../domain/interfaces/question.repository';

import { CreateQuestionDto } from '../dtos/create-question.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateQuestionUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_REPOSITORY)
    private readonly repository: QuestionRepository,
  ) {}

  async execute(
    dto: CreateQuestionDto,
  ) {
const question = Question.create({
  questionId: crypto.randomUUID(),
  questionnaireId: dto.questionnaireId,
  orderIndex: dto.orderIndex,
  questionText: dto.questionText,
  questionType: dto.questionType,
  isRequired: dto.isRequired,
  scaleMin: dto.scaleMin,
  scaleMax: dto.scaleMax,
  allowNotApplicable: dto.allowNotApplicable,
}); 

    return this.repository.create(question);
  }
}