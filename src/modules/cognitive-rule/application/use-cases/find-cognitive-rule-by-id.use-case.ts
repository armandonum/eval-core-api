// application/use-cases/find-cognitive-rule-by-id.use-case.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICognitiveRuleRepository } from '../../domain/interfaces/cognitive-rule.repository';
import { CognitiveRule } from '../../domain/entities/cognitive-rule.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class FindCognitiveRuleByIdUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_RULES)

    private readonly repository: ICognitiveRuleRepository,
  ) {}

  async execute(id: string): Promise<CognitiveRule> {
    const rule = await this.repository.findById(id);
    if (!rule) {
      throw new NotFoundException('Cognitive rule not found');
    }
    return rule;
  }
}