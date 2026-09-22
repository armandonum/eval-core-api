import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
} from 'typeorm';

import { QuestionAnswerOptionRepository } from '../../domain/interfaces/question-answer-option.repository';
import { QuestionAnswerOption } from '../../domain/entities/question-answer-option.entity';

import { QuestionAnswerOptionMapper } from '../typeorm/question-answer-option.mapper';
import { QuestionAnswerOptionTypeormEntity } from '../typeorm/question-answer-option.typeorm.entity';

@Injectable()
export class QuestionAnswerOptionRepositoryImpl
  implements QuestionAnswerOptionRepository
{
  constructor(
    @InjectRepository(
      QuestionAnswerOptionTypeormEntity,
    )
    private readonly repository: Repository<QuestionAnswerOptionTypeormEntity>,
  ) {}

  async create(
    relation: QuestionAnswerOption,
  ): Promise<QuestionAnswerOption> {

    const persistence =
      QuestionAnswerOptionMapper.toPersistence(
        relation,
      );

    const saved =
      await this.repository.save(
        persistence,
      );

    return QuestionAnswerOptionMapper.toDomain(
      saved,
    );
  }

  async delete(
    answerId: string,
    optionId: string,
  ): Promise<void> {

    await this.repository.delete({
      answer_id: answerId,
      option_id: optionId,
    });
  }

  async deleteByAnswer(
    answerId: string,
  ): Promise<void> {

    await this.repository.delete({
      answer_id: answerId,
    });
  }

  async findByAnswer(
    answerId: string,
  ): Promise<QuestionAnswerOption[]> {

    const list =
      await this.repository.find({
        where: {
          answer_id: answerId,
        },
      });

    return QuestionAnswerOptionMapper.toDomainList(
      list,
    );
  }

  async findByOption(
    optionId: string,
  ): Promise<QuestionAnswerOption[]> {

    const list =
      await this.repository.find({
        where: {
          option_id: optionId,
        },
      });

    return QuestionAnswerOptionMapper.toDomainList(
      list,
    );
  }

  async exists(
    answerId: string,
    optionId: string,
  ): Promise<boolean> {

    const relation =
      await this.repository.findOne({
        where: {
          answer_id: answerId,
          option_id: optionId,
        },
      });

    return relation !== null;
  }
}