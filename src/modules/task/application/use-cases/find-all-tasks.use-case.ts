import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type{ TaskRepository } from '../../domain/interfaces/task.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindAllTasksUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.TASK_REPOSITORY)
    private readonly repository: TaskRepository,
  ) {}

  async execute() {
    return this.repository.findAll();
  }
}