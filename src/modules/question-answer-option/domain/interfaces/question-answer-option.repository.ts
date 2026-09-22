import { QuestionAnswerOption } from '../entities/question-answer-option.entity';

export interface QuestionAnswerOptionRepository {

  create(
    relation: QuestionAnswerOption,
  ): Promise<QuestionAnswerOption>;

  delete(
    answerId: string,
    optionId: string,
  ): Promise<void>;

  deleteByAnswer(
    answerId: string,
  ): Promise<void>;

  findByAnswer(
    answerId: string,
  ): Promise<QuestionAnswerOption[]>;

  findByOption(
    optionId: string,
  ): Promise<QuestionAnswerOption[]>;

  exists(
    answerId: string,
    optionId: string,
  ): Promise<boolean>;
}