
// application/use-cases/update-cognitive-task-status.use-case.ts
import { Injectable,Inject, NotFoundException } from '@nestjs/common';
import { ICognitiveTaskRepository } from '../../domain/interfaces/cognitive-task.repository';
import { CognitiveTaskStatus } from '../../domain/enums/cognitive-task-status.enum';
import { CognitiveTask } from '../../domain/entities/cognitive-task.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class UpdateCognitiveTaskStatusUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_TASK)

    private readonly repository: ICognitiveTaskRepository,
  ) {}

  async execute(id: string, status: CognitiveTaskStatus): Promise<CognitiveTask> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new NotFoundException('Cognitive task not found');
    }

    // Usar métodos de dominio
    switch (status) {
      case CognitiveTaskStatus.IN_PROGRESS:
        task.start();
        break;
      case CognitiveTaskStatus.COMPLETED:
        task.complete();
        break;
      case CognitiveTaskStatus.FAILED:
        task.fail();
        break;
      case CognitiveTaskStatus.PENDING:
        if (!task.isCompleted()) {
          task.status = status;
          task.updatedAt = new Date();
        }
        break;
    }

    return this.repository.update(task);
  }
}