
// application/use-cases/find-cognitive-evaluator-by-id.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveEvaluatorRepository } from '../../domain/interfaces/cognitive-evaluator.repository';
import { CognitiveEvaluator } from '../../domain/entities/cognitive-evaluator.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class FindCognitiveEvaluatorByIdUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATOR)
    private readonly repository: ICognitiveEvaluatorRepository,
  ) {}

  async execute(id: string): Promise<CognitiveEvaluator> {
    const evaluator = await this.repository.findById(id);
    if (!evaluator) {
      throw new NotFoundException('Cognitive evaluator not found');
    }
    return evaluator;
  }
}
