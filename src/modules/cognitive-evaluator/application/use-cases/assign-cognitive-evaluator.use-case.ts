// application/use-cases/assign-cognitive-evaluator.use-case.ts
import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { CognitiveEvaluator } from '../../domain/entities/cognitive-evaluator.entity';
import { CognitiveEvaluatorRole } from '../../domain/enums/cognitive-evaluator-role.enum';
import { ICognitiveEvaluatorRepository } from '../../domain/interfaces/cognitive-evaluator.repository';
import { ICognitiveEvaluationRepository } from '../../../cognitive-evaluation/domain/interfaces/cognitive-evaluation.repository';
import { AssignCognitiveEvaluatorDto } from '../dtos/assign-cognitive-evaluator.dto';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class AssignCognitiveEvaluatorUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATOR)
    private readonly evaluatorRepository: ICognitiveEvaluatorRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly evaluationRepository: ICognitiveEvaluationRepository,
  ) {}

  async execute(dto: AssignCognitiveEvaluatorDto): Promise<CognitiveEvaluator> {
    // Verificar que la evaluación existe
    const evaluation = await this.evaluationRepository.findById(dto.evaluationId);
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    // Verificar que la evaluación puede aceptar evaluadores
    if (!evaluation.canAssignEvaluators()) {
      throw new ConflictException(
        'Cannot assign evaluators to an evaluation that is already in progress or completed',
      );
    }

    // Verificar que el usuario no esté ya asignado a esta evaluación
    const existing = await this.evaluatorRepository.findByUserAndEvaluation(
      dto.userId,
      dto.evaluationId,
    );
    if (existing) {
      throw new ConflictException('User is already assigned to this evaluation');
    }

    // Crear el evaluador
    const evaluator = new CognitiveEvaluator(
      crypto.randomUUID(),
      dto.evaluationId,
      dto.userId,
      dto.evaluatorRole || CognitiveEvaluatorRole.EVALUATOR,
      new Date(),
      null,
      dto.notes || null,
    );

    return this.evaluatorRepository.create(evaluator);
  }
}