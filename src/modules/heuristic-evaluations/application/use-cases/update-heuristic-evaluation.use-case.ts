import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicEvaluationRepository,
} from '../../domain/interfaces/heuristic-evaluation.repository';
import { HeuristicEvaluation } from '../../domain/entities/heuristic-evaluation.entity';
import { UpdateHeuristicEvaluationDto } from '../dtos/update-heuristic-evaluation.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class UpdateHeuristicEvaluationUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_EVALUATION_REPOSITORY)
    private readonly repository: HeuristicEvaluationRepository,
  ) {}

  async execute(id: string, dto: UpdateHeuristicEvaluationDto): Promise<HeuristicEvaluation> {
    const evaluation = await this.repository.findById(id);
    if (!evaluation) {
      throw new NotFoundException(`Evaluación con ID ${id} no encontrada`);
    }

    evaluation.update(
      dto.name,
      dto.description,
      dto.systemDescription,
      dto.targetUserDescription,
      dto.maxDurationMinutes,
    );

    return this.repository.update(id, evaluation);
  }
}