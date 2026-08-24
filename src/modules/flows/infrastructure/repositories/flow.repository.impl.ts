import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FlowRepository } from '../../domain/interfaces/flow.repository';
import { Flow } from '../../domain/entities/flow.entity';

import { FlowTypeormEntity } from '../typeorm/flow.typeorm.entity';
import { FlowMapper } from '../typeorm/flow.mapper';

@Injectable()
export class FlowRepositoryImpl implements FlowRepository {
  constructor(
    @InjectRepository(FlowTypeormEntity)
    private readonly repository: Repository<FlowTypeormEntity>,
  ) {}

  async create(flow: Flow): Promise<Flow> {
    const persistence = FlowMapper.toPersistence(flow);
    const saved = await this.repository.save(persistence);
    return FlowMapper.toDomain(saved);
  }

  async findById(flowId: string): Promise<Flow | null> {
    const orm = await this.repository.findOne({
      where: { flow_id: flowId },
    });

    return orm ? FlowMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<Flow[]> {
    const rows = await this.repository.find({
      order: { started_at: 'DESC' },
    });

    return FlowMapper.toDomainList(rows);
  }

  async findAllByTask(taskId: string): Promise<Flow[]> {
    const rows = await this.repository.find({
      where: { task_id: taskId },
      order: { started_at: 'DESC' },
    });

    return FlowMapper.toDomainList(rows);
  }

  async update(flow: Flow): Promise<Flow> {
    const persistence = FlowMapper.toPersistence(flow);

    await this.repository.update(
      { flow_id: flow.flowId },
      persistence,
    );

    const updated = await this.findById(flow.flowId);

    if (!updated) {
      throw new Error('Flow not found');
    }

    return updated;
  }

  async delete(flowId: string): Promise<void> {
    await this.repository.delete({ flow_id: flowId });
  }
}