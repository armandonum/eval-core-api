
// application/use-cases/find-all-cognitive-rules.use-case.ts
import { Injectable,Inject } from '@nestjs/common';
import { ICognitiveRuleRepository } from '../../domain/interfaces/cognitive-rule.repository';
import { CognitiveRule } from '../../domain/entities/cognitive-rule.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class FindAllCognitiveRulesUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_RULES)

    private readonly repository: ICognitiveRuleRepository,
  ) {}

  async execute(): Promise<CognitiveRule[]> {
    return this.repository.findAll();
  }
}
