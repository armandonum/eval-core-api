import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicEvaluatorRepository,
  HEURISTIC_EVALUATOR_REPOSITORY,
} from '../../domain/interfaces/heuristic-evaluator.repository';

@Injectable()
export class DeleteEvaluatorUseCase {
  constructor(
    @Inject(HEURISTIC_EVALUATOR_REPOSITORY)
    private readonly repository: HeuristicEvaluatorRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const evaluator = await this.repository.findById(id);
    if (!evaluator) {
      throw new NotFoundException(`Evaluador con ID ${id} no encontrado`);
    }
    await this.repository.delete(id);
  }
}