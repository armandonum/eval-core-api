import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicTaskProgressRepository,
  HEURISTIC_TASK_PROGRESS_REPOSITORY,
} from '../../domain/interfaces/heuristic-task-progress.repository';
import { HeuristicTaskProgress } from '../../domain/entities/heuristic-task-progress.entity';
import { CreateTaskProgressDto } from '../dtos/create-task-progress.dto';

@Injectable()
export class UpsertTaskProgressUseCase {
  constructor(
    @Inject(HEURISTIC_TASK_PROGRESS_REPOSITORY)
    private readonly repository: HeuristicTaskProgressRepository,
  ) {}

  async execute(dto: CreateTaskProgressDto): Promise<HeuristicTaskProgress> {
    // Verificar si ya existe un progreso para este evaluador + tarea
    const existing = await this.repository.findByEvaluatorAndTask(
      dto.evaluatorId,
      dto.taskId,
    );

    if (existing) {
      // Actualizar estado existente
      existing.changeStatus(dto.status ?? 'in_progress', dto.sessionId);
      return this.repository.update(existing.progressId, existing);
    }

    // Crear nuevo
    const progress = HeuristicTaskProgress.create(
      dto.evaluatorId,
      dto.taskId,
      dto.evaluationId,
      dto.sessionId ?? null,
      dto.status ?? 'pending',
    );

    return this.repository.create(progress);
  }
}