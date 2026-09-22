
// application/use-cases/find-cognitive-evaluations-by-project.use-case.ts
import { Injectable,Inject } from '@nestjs/common';
import { ICognitiveEvaluationRepository } from '../../domain/interfaces/cognitive-evaluation.repository';
import { CognitiveEvaluation } from '../../domain/entities/cognitive-evaluation.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'


@Injectable()
export class FindCognitiveEvaluationsByProjectUseCase {
  constructor( 
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly repository: ICognitiveEvaluationRepository,
  ) {}

  async execute(projectId: string): Promise<CognitiveEvaluation[]> {
    return this.repository.findByProject(projectId);
  }
}