import { Inject, Injectable, ConflictException } from '@nestjs/common';
import {
  HeuristicEvaluatorRepository,
  HEURISTIC_EVALUATOR_REPOSITORY,
} from '../../domain/interfaces/heuristic-evaluator.repository';
import { HeuristicEvaluator } from '../../domain/entities/heuristic-evaluator.entity';
import { AssignEvaluatorDto } from '../dtos/assign-evaluator.dto';

@Injectable()
export class AssignEvaluatorUseCase {
  constructor(
    @Inject(HEURISTIC_EVALUATOR_REPOSITORY)
    private readonly repository: HeuristicEvaluatorRepository,
  ) {}

  async execute(dto: AssignEvaluatorDto): Promise<HeuristicEvaluator> {
    // Verificar si el usuario ya está asignado a esta evaluación
    const existing = await this.repository.findByEvaluationAndUser(
      dto.evaluationId,
      dto.userId,
    );
    if (existing) {
      throw new ConflictException(
        'El usuario ya está asignado a esta evaluación',
      );
    }

    const evaluator = HeuristicEvaluator.create(
      dto.evaluationId,
      dto.userId,
      dto.role ?? 'evaluator',
      dto.notes ?? null,
    );

    return this.repository.create(evaluator);
  }
}