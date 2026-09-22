
// application/use-cases/find-cognitive-evaluators-by-evaluation.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ICognitiveEvaluatorRepository } from '../../domain/interfaces/cognitive-evaluator.repository';
import { CognitiveEvaluator } from '../../domain/entities/cognitive-evaluator.entity';
import { CognitiveEvaluatorRole } from '../../domain/enums/cognitive-evaluator-role.enum';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class FindCognitiveEvaluatorsByEvaluationUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATOR)
    private readonly repository: ICognitiveEvaluatorRepository,
  ) {}

  async execute(
    evaluationId: string,
    role?: CognitiveEvaluatorRole,
    completed?: boolean,
  ): Promise<CognitiveEvaluator[]> {
    if (role) {
      return this.repository.findByEvaluationAndRole(evaluationId, role);
    }
    if (completed !== undefined) {
      return this.repository.findByEvaluationAndStatus(evaluationId, completed);
    }
    return this.repository.findByEvaluation(evaluationId);
  }
}