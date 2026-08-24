import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FlowEvaluationRepository } from '../../domain/interfaces/flow-evaluation.repository';
import { FlowEvaluation } from '../../domain/entities/flow-evaluation.entity';

import { FlowEvaluationMapper } from '../typeorm/flow-evaluation.mapper';
import { FlowEvaluationTypeormEntity } from '../typeorm/flow-evaluation.typeorm.entity';

@Injectable()
export class FlowEvaluationRepositoryImpl
  implements FlowEvaluationRepository
{
  constructor(
    @InjectRepository(
      FlowEvaluationTypeormEntity,
    )
    private readonly repository: Repository<FlowEvaluationTypeormEntity>,
  ) {}

  async create(
    evaluation: FlowEvaluation,
  ): Promise<FlowEvaluation> {

    const persistence =
      FlowEvaluationMapper.toPersistence(
        evaluation,
      );

    const saved =
      await this.repository.save(
        persistence,
      );

    return FlowEvaluationMapper.toDomain(
      saved,
    );
  }

  async findById(
    evaluationId: string,
  ): Promise<FlowEvaluation | null> {

    const orm =
      await this.repository.findOne({
        where: {
          evaluation_id: evaluationId,
        },
      });

    return orm
      ? FlowEvaluationMapper.toDomain(orm)
      : null;
  }

  async findBySession(
    sessionId: string,
  ): Promise<FlowEvaluation | null> {

    const orm =
      await this.repository.findOne({
        where: {
          session_id: sessionId,
        },
      });

    return orm
      ? FlowEvaluationMapper.toDomain(orm)
      : null;
  }

  async findAll(): Promise<FlowEvaluation[]> {

    const orms =
      await this.repository.find({
        order: {
          created_at: 'DESC',
        },
      });

    return FlowEvaluationMapper.toDomainList(
      orms,
    );
  }

  async update(
    evaluation: FlowEvaluation,
  ): Promise<FlowEvaluation> {

    const persistence =
      FlowEvaluationMapper.toPersistence(
        evaluation,
      );

    await this.repository.update(
      {
        evaluation_id:
          evaluation.evaluationId,
      },
      persistence,
    );

    const updated =
      await this.findById(
        evaluation.evaluationId,
      );

    if (!updated) {
      throw new Error(
        'Flow Evaluation not found',
      );
    }

    return updated;
  }

  async delete(
    evaluationId: string,
  ): Promise<void> {

    await this.repository.delete({
      evaluation_id: evaluationId,
    });

  }

}