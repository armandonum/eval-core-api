import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicTaskProgressRepository,
  HEURISTIC_TASK_PROGRESS_REPOSITORY,
} from '../../domain/interfaces/heuristic-task-progress.repository';
import { HeuristicTaskProgress } from '../../domain/entities/heuristic-task-progress.entity';
import { UpdateTaskProgressDto } from '../dtos/update-task-progress.dto';

@Injectable()
export class UpdateTaskProgressStatusUseCase {
  constructor(
    @Inject(HEURISTIC_TASK_PROGRESS_REPOSITORY)
    private readonly repository: HeuristicTaskProgressRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateTaskProgressDto,
  ): Promise<HeuristicTaskProgress> {
    const progress = await this.repository.findById(id);
    if (!progress) {
      throw new NotFoundException(`Progreso con ID ${id} no encontrado`);
    }

    if (dto.status) {
      progress.changeStatus(dto.status, dto.sessionId);
    }

    return this.repository.update(id, progress);
  }
}