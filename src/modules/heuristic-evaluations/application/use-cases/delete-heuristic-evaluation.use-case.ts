import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicEvaluationRepository,
} from '../../domain/interfaces/heuristic-evaluation.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class DeleteHeuristicEvaluationUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_EVALUATION_REPOSITORY)
    private readonly repository: HeuristicEvaluationRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const evaluation = await this.repository.findById(id);
    if (!evaluation) {
      throw new NotFoundException(`Evaluación con ID ${id} no encontrada`);
    }
    await this.repository.delete(id);
  }
}