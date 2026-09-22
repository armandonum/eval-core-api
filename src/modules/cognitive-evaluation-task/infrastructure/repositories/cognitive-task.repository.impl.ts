// infrastructure/repositories/cognitive-task.repository.impl.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ICognitiveTaskRepository } from '../../domain/interfaces/cognitive-task.repository';
import { CognitiveTask } from '../../domain/entities/cognitive-task.entity';
import { CognitiveTaskOrmEntity } from '../typeorm/cognitive-task.orm-entity';
import { CognitiveTaskMapper } from '../typeorm/cognitive-task.mapper';
import { CognitiveTaskStatus } from '../../domain/enums/cognitive-task-status.enum';

@Injectable()
export class CognitiveTaskRepository implements ICognitiveTaskRepository {
  constructor(
    @InjectRepository(CognitiveTaskOrmEntity)
    private readonly repository: Repository<CognitiveTaskOrmEntity>,
  ) {}

  async create(task: CognitiveTask): Promise<CognitiveTask> {
    const orm = CognitiveTaskMapper.toPersistence(task);
    const saved = await this.repository.save(orm as CognitiveTaskOrmEntity);
    return CognitiveTaskMapper.toDomain(saved);
  }

  async update(task: CognitiveTask): Promise<CognitiveTask> {
    const orm = CognitiveTaskMapper.toPersistence(task);
    const saved = await this.repository.save(orm as CognitiveTaskOrmEntity);
    return CognitiveTaskMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<CognitiveTask | null> {
    const orm = await this.repository.findOne({
      where: { id },
    });
    return orm ? CognitiveTaskMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<CognitiveTask[]> {
    const query = await this.repository.find({
      order:{created_at:'ASC'}
    })
    return CognitiveTaskMapper.toDomainArray(query);
  }

  async findByEvaluation(evaluationId: string): Promise<CognitiveTask[]> {
    const orms = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { order_index: 'ASC' },
    });
    return CognitiveTaskMapper.toDomainArray(orms);
  }

  async findByStatus(status: CognitiveTaskStatus): Promise<CognitiveTask[]> {
    const orms = await this.repository.find({
      where: { status },
      order: { created_at: 'DESC' },
    });
    return CognitiveTaskMapper.toDomainArray(orms);
  }

  async findByEvaluationAndStatus(
    evaluationId: string,
    status: CognitiveTaskStatus,
  ): Promise<CognitiveTask[]> {
    const orms = await this.repository.find({
      where: { 
        evaluation_id: evaluationId,
        status,
      },
      order: { order_index: 'ASC' },
    });
    return CognitiveTaskMapper.toDomainArray(orms);
  }

  async updateStatus(id: string, status: CognitiveTaskStatus): Promise<CognitiveTask> {
    await this.repository.update(
      { id },
      { status, updated_at: new Date() },
    );
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException('Task not found after update');
    }
    return updated;
  }

  async updateOrder(id: string, orderIndex: number): Promise<CognitiveTask> {
    await this.repository.update(
      { id },
      { order_index: orderIndex, updated_at: new Date() },
    );
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException('Task not found after update');
    }
    return updated;
  }

  async countByEvaluation(evaluationId: string): Promise<number> {
    return this.repository.count({
      where: { evaluation_id: evaluationId },
    });
  }

  async countByStatus(status: CognitiveTaskStatus): Promise<number> {
    return this.repository.count({
      where: { status },
    });
  }

  async getMaxOrderIndex(evaluationId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('ct')
      .select('MAX(ct.order_index)', 'max')
      .where('ct.evaluation_id = :evaluationId', { evaluationId })
      .getRawOne();
    
    return result?.max || 0;
  }

  async reorderTasks(evaluationId: string, taskIds: string[]): Promise<void> {
    // Actualizar el orden de todas las tareas
    const tasks = await this.repository.find({
      where: { 
        evaluation_id: evaluationId,
        id: In(taskIds),
      },
    });

    const taskMap = new Map(taskIds.map((id, index) => [id, index + 1]));
    
    for (const task of tasks) {
      const newOrder = taskMap.get(task.id);
      if (newOrder !== undefined) {
        task.order_index = newOrder;
      }
    }

    await this.repository.save(tasks);
  }
}