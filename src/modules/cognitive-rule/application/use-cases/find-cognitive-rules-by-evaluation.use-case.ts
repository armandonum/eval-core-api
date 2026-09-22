
// application/use-cases/find-cognitive-rules-by-evaluation.use-case.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICognitiveRuleRepository } from '../../domain/interfaces/cognitive-rule.repository';
import { ICognitiveEvaluationRepository } from '../../../cognitive-evaluation/domain/interfaces/cognitive-evaluation.repository';
import { CognitiveRule } from '../../domain/entities/cognitive-rule.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class FindCognitiveRulesByEvaluationUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_RULES)
    private readonly ruleRepository: ICognitiveRuleRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly evaluationRepository: ICognitiveEvaluationRepository,
  ) {}

  async execute(evaluationId: string, ordered: boolean = true): Promise<CognitiveRule[]> {
    // Verificar que la evaluación existe
    const evaluation = await this.evaluationRepository.findById(evaluationId);
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    if (ordered) {
      return this.ruleRepository.findByEvaluationOrdered(evaluationId);
    }
    return this.ruleRepository.findByEvaluation(evaluationId);
  }
}
