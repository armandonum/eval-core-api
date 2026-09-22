// cognitive-evaluator/application/use-cases/get-evaluator-progress.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ICognitiveEvaluatorRepository } from '../../domain/interfaces/cognitive-evaluator.repository';
import { ICognitiveTaskRepository } from '../../../cognitive-evaluation-task/domain/interfaces/cognitive-task.repository';
// ❌ ELIMINAR ICognitiveActionRepository
// import { ICognitiveActionRepository } from '../../../cognitive-task-action/domain/interfaces/cognitive-action.repository';
import { CognitiveTaskStatus } from '../../../cognitive-evaluation-task/domain/enums/cognitive-task-status.enum';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class GetEvaluatorProgressUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATOR)
    private readonly evaluatorRepository: ICognitiveEvaluatorRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_TASK)
    private readonly taskRepository: ICognitiveTaskRepository,
    // ❌ ELIMINAR actionRepository
    // @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATION_ACTION)
    // private readonly actionRepository: ICognitiveActionRepository,
  ) {}

  async execute(evaluatorId: string): Promise<any> {
    const evaluator = await this.evaluatorRepository.findById(evaluatorId);
    if (!evaluator) {
      throw new Error('Evaluator not found');
    }

    // Obtener todas las tareas de la evaluación
    const tasks = await this.taskRepository.findByEvaluation(evaluator.evaluationId);
    const totalTasks = tasks.length;

    // Contar tareas por estado
    const completedTasks = tasks.filter(t => t.status === CognitiveTaskStatus.COMPLETED).length;
    const inProgressTasks = tasks.filter(t => t.status === CognitiveTaskStatus.IN_PROGRESS).length;
    const failedTasks = tasks.filter(t => t.status === CognitiveTaskStatus.FAILED).length;
    const pendingTasks = tasks.filter(t => t.status === CognitiveTaskStatus.PENDING).length;

    // 🔥 Calcular progreso SOLO con tareas (sin acciones)
    const progressPercentage = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

    return {
      evaluatorId: evaluator.id,
      userId: evaluator.userId,
      evaluationId: evaluator.evaluationId,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      failedTasks,
      progressPercentage,
      estimatedTimeRemaining: progressPercentage < 100 ? this.estimateTimeRemaining(progressPercentage) : 0,
    };
  }

  private estimateTimeRemaining(progressPercentage: number): number {
    const averageTimePerTask = 2;
    const remainingTasks = 100 - progressPercentage;
    return Math.round((remainingTasks / 100) * averageTimePerTask * 60);
  }
}