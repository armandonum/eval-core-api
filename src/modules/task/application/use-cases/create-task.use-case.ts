import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateTaskDto } from '../dtos/create-task.dto';
import { Task } from '../../domain/entities/task.entity';
import type { TaskRepository } from '../../domain/interfaces/task.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.TASK_REPOSITORY)
    private readonly repository: TaskRepository,
  ) {}

  async execute(
    dto: CreateTaskDto,
  ): Promise<Task> {
    const task = new Task(
      randomUUID(),
      dto.projectId,
      dto.title,
      dto.description,
      dto.requirementId,
      dto.orderIndex,
      new Date(),
    );

    return this.repository.create(task);
  }
}