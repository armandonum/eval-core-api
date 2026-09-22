// application/use-cases/find-cognitive-problems-by-evaluation.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ICognitiveProblemRepository } from '../../domain/interfaces/cognitive-problem.repository';
import { CognitiveProblem } from '../../domain/entities/cognitive-problem.entity';
import { CognitiveProblemStatus } from '../../domain/enums/cognitive-problem-status.enum';
import { CognitiveProblemSeverity } from '../../domain/enums/cognitive-problem-severity.enum';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindCognitiveProblemsByEvaluationUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_PROBLEMS)
    private readonly repository: ICognitiveProblemRepository,
  ) {}

  async execute(
    evaluationId: string,
    status?: CognitiveProblemStatus,
    severity?: CognitiveProblemSeverity,
  ): Promise<CognitiveProblem[]> {
    if (status) {
      return this.repository.findByEvaluationAndStatus(evaluationId, status);
    }
    if (severity) {
      return this.repository.findByEvaluationAndSeverity(evaluationId, severity);
    }
    return this.repository.findByEvaluation(evaluationId);
  }
}