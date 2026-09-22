import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HeuristicTaskRepository } from '../../domain/interfaces/heuristic-task.repository';
import { HeuristicTask } from '../../domain/entities/heuristic-task.entity';
import { HeuristicTaskTypeorm } from '../typeorm/heuristic-task.typeorm.entity';
import { HeuristicTaskMapper } from '../typeorm/heuristic-task.mapper';

@Injectable()
export class HeuristicTaskRepositoryImpl implements HeuristicTaskRepository {
  constructor(
    @InjectRepository(HeuristicTaskTypeorm)
    private readonly repository: Repository<HeuristicTaskTypeorm>,
    private readonly dataSource: DataSource,
  ) {}

  async create(task: HeuristicTask): Promise<HeuristicTask> {
    const typeorm = HeuristicTaskMapper.toTypeorm(task);
    const saved = await this.repository.save(typeorm);
    return HeuristicTaskMapper.toDomain(saved);
  }

  async findAll(): Promise<HeuristicTask[]> {
    const tasks = await this.repository.find({
      order: { order_index: 'ASC' },
    });
    return tasks.map(HeuristicTaskMapper.toDomain);
  }

  async findById(id: string): Promise<HeuristicTask | null> {
    const task = await this.repository.findOne({ where: { id } });
    return task ? HeuristicTaskMapper.toDomain(task) : null;
  }

  async findByEvaluation(evaluationId: string): Promise<HeuristicTask[]> {
    const tasks = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { order_index: 'ASC' },
    });
    return tasks.map(HeuristicTaskMapper.toDomain);
  }

  async findByProjectTask(projectTaskId: string): Promise<HeuristicTask[]> {
    const tasks = await this.repository.find({
      where: { project_task_id: projectTaskId },
      order: { order_index: 'ASC' },
    });
    return tasks.map(HeuristicTaskMapper.toDomain);
  }

  async findMaxOrderIndex(evaluationId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('task')
      .select('MAX(task.order_index)', 'max')
      .where('task.evaluation_id = :evaluationId', { evaluationId })
      .getRawOne();

    return result?.max ? parseInt(result.max, 10) : 0;
  }

  async update(id: string, task: Partial<HeuristicTask>): Promise<HeuristicTask> {
    await this.repository.update(id, {
      title: task.title,
      description: task.description,
      user_goal: task.userGoal,
      order_index: task.orderIndex,
      status: task.status,
      updated_at: new Date(),
    });
    const updated = await this.repository.findOne({ where: { id } });
    return HeuristicTaskMapper.toDomain(updated!);
  }

  async reorder(evaluationId: string, taskIds: string[]): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let i = 0; i < taskIds.length; i++) {
        await queryRunner.manager.update(
          HeuristicTaskTypeorm,
          { id: taskIds[i], evaluation_id: evaluationId },
          { order_index: i + 1, updated_at: new Date() },
        );
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByEvaluation(evaluationId: string): Promise<void> {
    await this.repository.delete({ evaluation_id: evaluationId });
  }
}