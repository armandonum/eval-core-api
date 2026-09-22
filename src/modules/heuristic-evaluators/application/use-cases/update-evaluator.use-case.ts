import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicEvaluatorRepository,
  HEURISTIC_EVALUATOR_REPOSITORY,
} from '../../domain/interfaces/heuristic-evaluator.repository';
import { HeuristicEvaluator } from '../../domain/entities/heuristic-evaluator.entity';
import { UpdateEvaluatorDto } from '../dtos/update-evaluator.dto';

@Injectable()
export class UpdateEvaluatorUseCase {
  constructor(
    @Inject(HEURISTIC_EVALUATOR_REPOSITORY)
    private readonly repository: HeuristicEvaluatorRepository,
  ) {}

  async execute(id: string, dto: UpdateEvaluatorDto): Promise<HeuristicEvaluator> {
    const evaluator = await this.repository.findById(id);
    if (!evaluator) {
      throw new NotFoundException(`Evaluador con ID ${id} no encontrado`);
    }

    evaluator.update(dto.role, dto.notes);

    return this.repository.update(id, evaluator);
  }
}