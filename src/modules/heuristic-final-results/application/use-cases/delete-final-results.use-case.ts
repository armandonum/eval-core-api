import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicFinalResultRepository,
  HEURISTIC_FINAL_RESULT_REPOSITORY,
} from '../../domain/interfaces/heuristic-final-result.repository';

@Injectable()
export class DeleteFinalResultsUseCase {
  constructor(
    @Inject(HEURISTIC_FINAL_RESULT_REPOSITORY)
    private readonly repository: HeuristicFinalResultRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new NotFoundException(`Resultado final con ID ${id} no encontrado`);
    }
    await this.repository.delete(id);
  }
}