import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicFinalResultRepository,
  HEURISTIC_FINAL_RESULT_REPOSITORY,
} from '../../domain/interfaces/heuristic-final-result.repository';
import { HeuristicFinalResult } from '../../domain/entities/heuristic-final-result.entity';
import { UpdateFinalResultStatusDto } from '../dtos/update-final-result-status.dto';

@Injectable()
export class UpdateFinalResultStatusUseCase {
  constructor(
    @Inject(HEURISTIC_FINAL_RESULT_REPOSITORY)
    private readonly repository: HeuristicFinalResultRepository,
  ) {}

  async execute(id: string, dto: UpdateFinalResultStatusDto): Promise<HeuristicFinalResult> {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new NotFoundException(`Resultado final con ID ${id} no encontrado`);
    }

    result.changeStatus(dto.status);

    return this.repository.update(id, result);
  }
}