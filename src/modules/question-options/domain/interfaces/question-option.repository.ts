import { QuestionOption } from '../entities/question-option.entity';

export interface QuestionOptionRepository {

  create(
    option: QuestionOption,
  ): Promise<QuestionOption>;

  update(
    option: QuestionOption,
  ): Promise<QuestionOption>;

  delete(
    optionId: string,
  ): Promise<void>;

  findById(
    optionId: string,
  ): Promise<QuestionOption | null>;

  findAll(): Promise<QuestionOption[]>;

  findByQuestionId(
    questionId: string,
  ): Promise<QuestionOption[]>;
}