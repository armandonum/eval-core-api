// application/use-cases/find-all-cognitive-evaluators.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ICognitiveEvaluatorRepository } from '../../domain/interfaces/cognitive-evaluator.repository';
import { CognitiveEvaluator } from '../../domain/entities/cognitive-evaluator.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class FindAllCognitiveEvaluatorsUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATOR)
    private readonly repository: ICognitiveEvaluatorRepository,
  ) {}

  async execute(): Promise<CognitiveEvaluator[]> {
    return this.repository.findAll();
  }
}
