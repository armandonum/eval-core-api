import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuestionRepository } from '../../domain/interfaces/question.repository';
import { Question } from '../../domain/entities/question.entity';

import { QuestionOrmMapper } from '../typeorm/question.orm-mapper';
import { QuestionTypeormEntity } from '../typeorm/question.typeorm.entity';

@Injectable()
export class QuestionRepositoryImpl
  implements QuestionRepository
{
  constructor(
    @InjectRepository(
      QuestionTypeormEntity,
    )
    private readonly repository: Repository<QuestionTypeormEntity>,
  ) {}

  async create(
    question: Question,
  ): Promise<Question> {
    const orm =
      QuestionOrmMapper.toPersistence(
        question,
      );

    const saved =
      await this.repository.save(orm);

    return QuestionOrmMapper.toDomain(saved);
  }

  async update(
    question: Question,
  ): Promise<Question> {
    await this.repository.update(
      {
        question_id: question.questionId,
      },
      QuestionOrmMapper.toPersistence(
        question,
      ),
    );

    return (
      await this.findById(
        question.questionId,
      )
    )!;
  }

  async delete(
    questionId: string,
  ): Promise<void> {
    await this.repository.delete({
      question_id: questionId,
    });
  }

  async findById(
    questionId: string,
  ): Promise<Question | null> {
    const orm =
      await this.repository.findOne({
        where: {
          question_id: questionId,
        },
      });

    if (!orm) {
      return null;
    }

    return QuestionOrmMapper.toDomain(orm);
  }

  async findByQuestionnaireId(
    questionnaireId: string,
  ): Promise<Question[]> {
    const list =
      await this.repository.find({
        where: {
          questionnaire_id:
            questionnaireId,
        },
        order: {
          order_index: 'ASC',
        },
      });

    return QuestionOrmMapper.toDomainList(
      list,
    );
  }

  async findAll(): Promise<Question[]> {
    const list =
      await this.repository.find({
        order: {
          order_index: 'ASC',
        },
      });

    return QuestionOrmMapper.toDomainList(
      list,
    );
  }
}