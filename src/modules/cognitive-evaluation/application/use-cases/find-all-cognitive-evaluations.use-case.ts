
// application/use-cases/find-all-cognitive-evaluations.use-case.ts
import { Injectable,Inject } from '@nestjs/common';
import { ICognitiveEvaluationRepository } from '../../domain/interfaces/cognitive-evaluation.repository';
import { CognitiveEvaluation } from '../../domain/entities/cognitive-evaluation.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'


@Injectable()
export class FindAllCognitiveEvaluationsUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly repository: ICognitiveEvaluationRepository,
  ) {}

  async execute(): Promise<CognitiveEvaluation[]> {
    return this.repository.findAll();
  }
}