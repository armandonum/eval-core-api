import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateTaskDto } from '../dtos/update-task.dto';
import type{ TaskRepository } from '../../domain/interfaces/task.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.TASK_REPOSITORY)
    private readonly repository: TaskRepository,
  ) {}

  async execute(
    taskId: string,
    dto: UpdateTaskDto,
  ) {
    const task =
      await this.repository.findById(taskId);

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    task.update(
      dto.title ?? task.title,
      dto.description ?? task.description,
      dto.orderIndex ?? task.orderIndex,
    );

    return this.repository.update(task);
  }
}