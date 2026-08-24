
// application/use-cases/delete-cognitive-rule.use-case.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICognitiveRuleRepository } from '../../domain/interfaces/cognitive-rule.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class DeleteCognitiveRuleUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_RULES)

    private readonly repository: ICognitiveRuleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const rule = await this.repository.findById(id);
    if (!rule) {
      throw new NotFoundException('Cognitive rule not found');
    }

    await this.repository.delete(id);
  }
}
