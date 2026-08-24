import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { TaskRepository } from '../../domain/interfaces/task.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindTaskUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.TASK_REPOSITORY)
    private readonly repository: TaskRepository,
  ) {}

  async execute(
    taskId: string,
  ) {
    const task =
      await this.repository.findById(taskId);

    if (!task) {    
      throw new NotFoundException(
        'Task not found',
      );
    }

    return task;
  }
}