
// application/use-cases/find-cognitive-evaluators-by-user.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ICognitiveEvaluatorRepository } from '../../domain/interfaces/cognitive-evaluator.repository';
import { CognitiveEvaluator } from '../../domain/entities/cognitive-evaluator.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindCognitiveEvaluatorsByUserUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATOR)
    private readonly repository: ICognitiveEvaluatorRepository,
  ) {}

  async execute(userId: string): Promise<CognitiveEvaluator[]> {
    return this.repository.findByUser(userId);
  }
}