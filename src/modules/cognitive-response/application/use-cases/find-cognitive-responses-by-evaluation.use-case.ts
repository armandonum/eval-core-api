
// application/use-cases/find-cognitive-responses-by-evaluation.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ICognitiveResponseRepository } from '../../domain/interfaces/cognitive-response.repository';
import { CognitiveResponse } from '../../domain/entities/cognitive-response.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindCognitiveResponsesByEvaluationUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_RESPONSES)
    private readonly repository: ICognitiveResponseRepository,
  ) {}

  async execute(evaluationId: string): Promise<CognitiveResponse[]> {
    return this.repository.findByEvaluation(evaluationId);
  }
}