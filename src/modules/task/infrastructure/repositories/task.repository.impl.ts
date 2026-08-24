import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskRepository } from '../../domain/interfaces/task.repository';
import { Task } from '../../domain/entities/task.entity';

import { TaskMapper } from '../typeorm/task.mapper';
import { TaskTypeormEntity } from '../typeorm/task.typeorm.entity';

@Injectable()
export class TaskRepositoryImpl
  implements TaskRepository
{
  constructor(
    @InjectRepository(TaskTypeormEntity)
    private readonly repository: Repository<TaskTypeormEntity>,
  ) {}

  async create(
    task: Task,
  ): Promise<Task> {

    const persistence =
      TaskMapper.toPersistence(task);

    const saved =
      await this.repository.save(persistence);

    return TaskMapper.toDomain(saved);
  }

  async findById(
    taskId: string,
  ): Promise<Task | null> {

    const orm =
      await this.repository.findOne({
        where: {
          task_id: taskId,
        },
      });

    return orm
      ? TaskMapper.toDomain(orm)
      : null;
  }

  async findAll(): Promise<Task[]> {

    const entities =
      await this.repository.find({
        order: {
          created_at: 'DESC',
        },
      });

    return TaskMapper.toDomainList(
      entities,
    );
  }

  async update(
    task: Task,
  ): Promise<Task> {

    const persistence =
      TaskMapper.toPersistence(task);

    await this.repository.update(
      {
        task_id: task.taskId,
      },
      persistence,
    );

    const updated =
      await this.findById(task.taskId);

    if (!updated) {
      throw new Error(
        'Task not found',
      );
    }

    return updated;
  }

  async delete(
    taskId: string,
  ): Promise<void> {

    await this.repository.delete({
      task_id: taskId,
    });
  }

  async findByRequirement(
    requirementId: string
  ): Promise<Task[]>{
    const entities = await this.repository.find({
      where:{
        requirement_id: requirementId
      }
  })
   return TaskMapper.toDomainList(
      entities,
    );
  }


  async findByProjectId(projectId: string): Promise<Task[]> {
    const entities = await this.repository.find({
      where: {
        project_id: projectId
      }
    })
    return TaskMapper.toDomainList(entities)
  }
}