import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { TaskRepository } from '../../domain/interfaces/task.repository';

import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class FindTaskByProjectIdUseCase {
    constructor(
        @Inject(INJECTION_TOKENS.TASK_REPOSITORY)
        private readonly repository: TaskRepository,
    ) {}

    async execute(
        projectId: string
    ) {
        const task = await this.repository.findByProjectId(projectId)
  
    return task;
    }
}