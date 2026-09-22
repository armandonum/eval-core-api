import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type { QuestionRepository } from '../../domain/interfaces/question.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class ReorderQuestionsUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.QUESTION_REPOSITORY)
    private readonly repository: QuestionRepository,
  ) {}

  async execute(
    questionnaireId: string,
    orderedQuestionIds: string[],
  ) {

    let index = 1;

    for (const questionId of orderedQuestionIds) {

      const question =
        await this.repository.findById(questionId);

      if (!question) {
        continue;
      }

      question.update({
        orderIndex: index,
      });

      await this.repository.update(question);

      index++;
    }

    return this.repository.findByQuestionnaireId(
      questionnaireId,
    );
  }
}