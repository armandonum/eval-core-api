
// application/use-cases/find-cognitive-tasks-by-evaluation.use-case.ts
import { Injectable,Inject } from '@nestjs/common';
import { ICognitiveTaskRepository } from '../../domain/interfaces/cognitive-task.repository';
import { CognitiveTask } from '../../domain/entities/cognitive-task.entity';
import { CognitiveTaskStatus } from '../../domain/enums/cognitive-task-status.enum';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class FindCognitiveTasksByEvaluationUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_TASK)

    private readonly repository: ICognitiveTaskRepository,
  ) {}

  async execute(
    evaluationId: string,
    status?: CognitiveTaskStatus,
  ): Promise<CognitiveTask[]> {
    if (status) {
      return this.repository.findByEvaluationAndStatus(evaluationId, status);
    }
    return this.repository.findByEvaluation(evaluationId);
  }
}