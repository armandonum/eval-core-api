import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuestionAnswerRepository } from '../../domain/interfaces/question-answer.repository';
import { QuestionAnswer } from '../../domain/entities/question-answer.entity';

import { QuestionAnswerMapper } from '../typeorm/question-answer.mapper';
import { QuestionAnswerTypeormEntity } from '../typeorm/question-answer.typeorm.entity';

@Injectable()
export class QuestionAnswerRepositoryImpl
  implements QuestionAnswerRepository
{
  constructor(
    @InjectRepository(
      QuestionAnswerTypeormEntity,
    )
    private readonly repository: Repository<QuestionAnswerTypeormEntity>,
  ) {}

  async create(
    answer: QuestionAnswer,
  ): Promise<QuestionAnswer> {

    const persistence =
      QuestionAnswerMapper.toPersistence(answer);

    const saved =
      await this.repository.save(persistence);

    return QuestionAnswerMapper.toDomain(saved);
  }

  async update(
    answer: QuestionAnswer,
  ): Promise<QuestionAnswer> {

    await this.repository.update(
      {
        answer_id: answer.answerId,
      },
      QuestionAnswerMapper.toPersistence(answer),
    );

    return (
      await this.findById(answer.answerId)
    )!;
  }

  async delete(
    answerId: string,
  ): Promise<void> {

    await this.repository.delete({
      answer_id: answerId,
    });
  }

  async findById(
    answerId: string,
  ): Promise<QuestionAnswer | null> {

    const orm =
      await this.repository.findOne({
        where: {
          answer_id: answerId,
        },
      });

    if (!orm) {
      return null;
    }

    return QuestionAnswerMapper.toDomain(orm);
  }

  async findByResponse(
    responseId: string,
  ): Promise<QuestionAnswer[]> {

    const list =
      await this.repository.find({
        where: {
          response_id: responseId,
        },
        order: {
          created_at: 'ASC',
        },
      });

    return QuestionAnswerMapper.toDomainList(list);
  }

  async findByQuestion(
    questionId: string,
  ): Promise<QuestionAnswer[]> {

    const list =
      await this.repository.find({
        where: {
          question_id: questionId,
        },
        order: {
          created_at: 'ASC',
        },
      });

    return QuestionAnswerMapper.toDomainList(list);
  }

  async findByResponseAndQuestion(
    responseId: string,
    questionId: string,
  ): Promise<QuestionAnswer | null> {

    const orm =
      await this.repository.findOne({
        where: {
          response_id: responseId,
          question_id: questionId,
        },
      });

    if (!orm) {
      return null;
    }

    return QuestionAnswerMapper.toDomain(orm);
  }

  async findAll(): Promise<QuestionAnswer[]> {

    const list =
      await this.repository.find({
        order: {
          created_at: 'ASC',
        },
      });

    return QuestionAnswerMapper.toDomainList(list);
  }
}