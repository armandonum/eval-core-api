
// application/use-cases/complete-evaluator-task.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveEvaluatorRepository } from '../../domain/interfaces/cognitive-evaluator.repository';
import { ICognitiveTaskRepository } from '../../../cognitive-evaluation-task/domain/interfaces/cognitive-task.repository';
import { CognitiveTaskStatus } from '../../../cognitive-evaluation-task/domain/enums/cognitive-task-status.enum';
import { CognitiveEvaluator } from '../../domain/entities/cognitive-evaluator.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class CompleteEvaluatorTaskUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATOR)
    private readonly evaluatorRepository: ICognitiveEvaluatorRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_TASK)
    private readonly taskRepository: ICognitiveTaskRepository,
  ) {}

  async execute(evaluatorId: string, notes?: string): Promise<CognitiveEvaluator> {
    const evaluator = await this.evaluatorRepository.findById(evaluatorId);
    if (!evaluator) {
      throw new NotFoundException('Cognitive evaluator not found');
    }

    // Verificar que todas las tareas estén completadas
    const tasks = await this.taskRepository.findByEvaluation(evaluator.evaluationId);
    const pendingTasks = tasks.filter(
      t => t.status === CognitiveTaskStatus.PENDING || 
           t.status === CognitiveTaskStatus.IN_PROGRESS
    );

    if (pendingTasks.length > 0) {
      throw new Error(
        `Cannot complete evaluator: ${pendingTasks.length} tasks are still pending or in progress`,
      );
    }

    evaluator.complete(notes);
    return this.evaluatorRepository.update(evaluator);
  }
}