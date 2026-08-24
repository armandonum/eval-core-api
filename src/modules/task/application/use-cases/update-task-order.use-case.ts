import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { TaskRepository } from '../../domain/interfaces/task.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class UpdateTaskOrderUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.TASK_REPOSITORY)
    private readonly repository: TaskRepository,
  ) {}

  async execute(
    taskId: string,
    orderIndex: number,
  ) {
    const task = await this.repository.findById(taskId);

    if (!task) {
      throw new NotFoundException(
        'Task not found.',
      );
    }

    task.orderIndex = orderIndex;

    return this.repository.update(task);
  }
}