import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import {
  HeuristicEvaluationRepository,
} from '../../domain/interfaces/heuristic-evaluation.repository';
import { HeuristicEvaluation } from '../../domain/entities/heuristic-evaluation.entity';
import { UpdateEvaluationStatusDto } from '../dtos/update-evaluation-status.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class UpdateEvaluationStatusUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_EVALUATION_REPOSITORY)
    private readonly repository: HeuristicEvaluationRepository,
  ) {}

  async execute(id: string, dto: UpdateEvaluationStatusDto): Promise<HeuristicEvaluation> {
    const evaluation = await this.repository.findById(id);
    if (!evaluation) {
      throw new NotFoundException(`Evaluación con ID ${id} no encontrada`);
    }

    // Validar transiciones de estado
    const validTransitions: Record<string, string[]> = {
      draft: ['planning', 'archived'],
      planning: ['in_progress', 'draft', 'archived'],
      in_progress: ['completed', 'archived'],
      completed: ['archived'],
      archived: [],
    };

    if (!validTransitions[evaluation.status]?.includes(dto.status)) {
      throw new BadRequestException(
        `No se puede cambiar de "${evaluation.status}" a "${dto.status}"`,
      );
    }

    evaluation.changeStatus(dto.status);

    return this.repository.update(id, evaluation);
  }
}