// application/use-cases/create-cognitive-rule.use-case.ts
import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { CognitiveRule } from '../../domain/entities/cognitive-rule.entity';
import { ICognitiveRuleRepository } from '../../domain/interfaces/cognitive-rule.repository';
import { ICognitiveEvaluationRepository } from '../../../cognitive-evaluation/domain/interfaces/cognitive-evaluation.repository';
import { CreateCognitiveRuleDto } from '../dtos/create-cognitive-rule.dto';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';




@Injectable()
export class CreateCognitiveRuleUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_RULES)
    private readonly ruleRepository: ICognitiveRuleRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly evaluationRepository: ICognitiveEvaluationRepository,
  ) {}

  async execute(dto: CreateCognitiveRuleDto): Promise<CognitiveRule> {
    // Verificar que la evaluación existe
    const evaluation = await this.evaluationRepository.findById(dto.evaluationId);
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    // Verificar que la evaluación puede aceptar reglas
    if (!evaluation.canAddTasks()) {
      throw new ConflictException(
        'Cannot add rules to an evaluation that is already in progress or completed',
      );
    }

    // Verificar que no exista una regla duplicada
    const existingRule = await this.ruleRepository.findDuplicateRule(
      dto.evaluationId,
      dto.description,
    );
    if (existingRule) {
      throw new ConflictException('A rule with this description already exists');
    }

    // Obtener el siguiente orden
    const maxOrder = await this.ruleRepository.getMaxOrder(dto.evaluationId);
    const ruleOrder = dto.ruleOrder ?? maxOrder + 1;

    const rule = new CognitiveRule(
      crypto.randomUUID(),
      dto.evaluationId,
      ruleOrder,
      dto.description.trim(),
      new Date(),
    );

    if (!rule.isValid()) {
      throw new ConflictException('Rule description cannot be empty');
    }

    return this.ruleRepository.create(rule);
  }
}