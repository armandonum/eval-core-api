
// application/use-cases/find-cognitive-actions-by-task.use-case.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICognitiveActionRepository } from '../../domain/interfaces/cognitive-action.repository';
import { ICognitiveTaskRepository } from '../../../cognitive-evaluation-task/domain/interfaces/cognitive-task.repository';
import { CognitiveAction } from '../../domain/entities/cognitive-action.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class FindCognitiveActionsByTaskUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATION_ACTION)
    private readonly actionRepository: ICognitiveActionRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_TASK)
    private readonly taskRepository: ICognitiveTaskRepository,
  ) {}

  async execute(taskId: string, ordered: boolean = true): Promise<CognitiveAction[]> {
    // Verificar que la tarea existe
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (ordered) {
      return this.actionRepository.findByTaskOrdered(taskId);
    }
    return this.actionRepository.findByTask(taskId);
  }
}
