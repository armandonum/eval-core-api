

// application/use-cases/reorder-cognitive-rules.use-case.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICognitiveRuleRepository } from '../../domain/interfaces/cognitive-rule.repository';
import { ReorderRulesDto } from '../dtos/reorder-rules.dto';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class ReorderCognitiveRulesUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_RULES)

    private readonly repository: ICognitiveRuleRepository,
  ) {}

  async execute(evaluationId: string, dto: ReorderRulesDto): Promise<void> {
    // Verificar que todas las reglas existen
    const rules = await this.repository.findByEvaluation(evaluationId);
    const ruleIds = rules.map(r => r.id);
    
    for (const id of dto.ruleIds) {
      if (!ruleIds.includes(id)) {
        throw new NotFoundException(`Rule with id ${id} not found in this evaluation`);
      }
    }

    await this.repository.reorderRules(evaluationId, dto.ruleIds);
  }
}