// application/use-cases/find-cognitive-evaluation-by-id.use-case.ts
import { Injectable,Inject, NotFoundException } from '@nestjs/common';
import { ICognitiveEvaluationRepository } from '../../domain/interfaces/cognitive-evaluation.repository';
import { CognitiveEvaluation } from '../../domain/entities/cognitive-evaluation.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'


@Injectable()
export class FindCognitiveEvaluationByIdUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly repository: ICognitiveEvaluationRepository,
  ) {}

  async execute(id: string): Promise<CognitiveEvaluation> {
    const evaluation = await this.repository.findById(id);
    if (!evaluation) {
      throw new NotFoundException('Cognitive evaluation not found');
    }
    return evaluation;
  }
}