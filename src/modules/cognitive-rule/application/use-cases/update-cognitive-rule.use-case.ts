
// application/use-cases/update-cognitive-rule.use-case.ts
import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { ICognitiveRuleRepository } from '../../domain/interfaces/cognitive-rule.repository';
import { UpdateCognitiveRuleDto } from '../dtos/update-cognitive-rule.dto';
import { CognitiveRule } from '../../domain/entities/cognitive-rule.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class UpdateCognitiveRuleUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_RULES)
    private readonly repository: ICognitiveRuleRepository,
  ) {}

  async execute(id: string, dto: UpdateCognitiveRuleDto): Promise<CognitiveRule> {
    const rule = await this.repository.findById(id);
    if (!rule) {
      throw new NotFoundException('Cognitive rule not found');
    }

    // Actualizar descripción
    if (dto.description !== undefined) {
      // Verificar duplicados
      const existingRule = await this.repository.findDuplicateRule(
        rule.evaluationId,
        dto.description,
      );
      if (existingRule && existingRule.id !== id) {
        throw new ConflictException('A rule with this description already exists');
      }
      rule.updateDescription(dto.description);
    }

    // Actualizar orden
    if (dto.ruleOrder !== undefined) {
      rule.updateOrder(dto.ruleOrder);
    }

    return this.repository.update(rule);
  }
}
