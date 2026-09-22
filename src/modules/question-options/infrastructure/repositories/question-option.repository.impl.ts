import {
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import { QuestionOptionRepository } from '../../domain/interfaces/question-option.repository';
import { QuestionOption } from '../../domain/entities/question-option.entity';

import { QuestionOptionMapper } from '../typeorm/question-option.mapper';
import { QuestionOptionOrmMapper } from '../typeorm/question-option.orm-mapper';
import { QuestionOptionTypeormEntity } from '../typeorm/question-option.typeorm.entity';

@Injectable()
export class QuestionOptionRepositoryImpl
  implements QuestionOptionRepository
{

  constructor(
    @InjectRepository(
      QuestionOptionTypeormEntity,
    )
    private readonly repository: Repository<QuestionOptionTypeormEntity>,
  ) {}

  async create(
    option: QuestionOption,
  ): Promise<QuestionOption> {

    const persistence =
      QuestionOptionOrmMapper.toPersistence(
        option,
      );

    const saved =
      await this.repository.save(
        persistence,
      );

    return QuestionOptionMapper.toDomain(
      saved,
    );
  }

  async update(
    option: QuestionOption,
  ): Promise<QuestionOption> {

    await this.repository.update(
      {
        option_id: option.optionId,
      },
      QuestionOptionOrmMapper.toPersistence(
        option,
      ),
    );

    return (
      await this.findById(
        option.optionId,
      )
    )!;
  }

  async delete(
    optionId: string,
  ): Promise<void> {

    await this.repository.delete({
      option_id: optionId,
    });
  }

  async findById(
    optionId: string,
  ): Promise<QuestionOption | null> {

    const orm =
      await this.repository.findOne({
        where: {
          option_id: optionId,
        },
      });

    if (!orm) {
      return null;
    }

    return QuestionOptionMapper.toDomain(
      orm,
    );
  }

  async findAll(): Promise<QuestionOption[]> {

    const list =
      await this.repository.find({
        order: {
          order_index: 'ASC',
        },
      });

    return QuestionOptionMapper.toDomainList(
      list,
    );
  }

  async findByQuestionId(
    questionId: string,
  ): Promise<QuestionOption[]> {

    const list =
      await this.repository.find({
        where: {
          question_id: questionId,
        },
        order: {
          order_index: 'ASC',
        },
      });

    return QuestionOptionMapper.toDomainList(
      list,
    );
  }

}