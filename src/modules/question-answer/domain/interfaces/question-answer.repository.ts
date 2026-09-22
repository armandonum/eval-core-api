import { QuestionAnswer } from '../entities/question-answer.entity'

export interface QuestionAnswerRepository {

  create(
    answer: QuestionAnswer,
  ): Promise<QuestionAnswer>

  update(
    answer: QuestionAnswer,
  ): Promise<QuestionAnswer>

  delete(
    answerId: string,
  ): Promise<void>

  findById(
    answerId: string,
  ): Promise<QuestionAnswer | null>

  findByResponse(
    responseId: string,
  ): Promise<QuestionAnswer[]>

  findByQuestion(
    questionId: string,
  ): Promise<QuestionAnswer[]>

  findByResponseAndQuestion(
    responseId: string,
    questionId: string,
  ): Promise<QuestionAnswer | null>

  findAll(): Promise<QuestionAnswer[]>
}