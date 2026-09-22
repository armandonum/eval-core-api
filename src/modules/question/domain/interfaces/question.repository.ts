import { Question } from '../entities/question.entity';

export interface QuestionRepository {
  create(
    question: Question,
  ): Promise<Question>;

  update(
    question: Question,
  ): Promise<Question>;

  delete(
    questionId: string,
  ): Promise<void>;

  findById(
    questionId: string,
  ): Promise<Question | null>;

  findByQuestionnaireId(
    questionnaireId: string,
  ): Promise<Question[]>;

  findAll(): Promise<Question[]>;
}