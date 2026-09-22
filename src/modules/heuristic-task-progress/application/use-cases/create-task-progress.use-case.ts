import { Inject, Injectable, ConflictException } from '@nestjs/common';
import {
  HeuristicTaskProgressRepository,
  HEURISTIC_TASK_PROGRESS_REPOSITORY,
} from '../../domain/interfaces/heuristic-task-progress.repository';
import { HeuristicTaskProgress } from '../../domain/entities/heuristic-task-progress.entity';
import { CreateTaskProgressDto } from '../dtos/create-task-progress.dto';

@Injectable()
export class CreateTaskProgressUseCase {
  constructor(
    @Inject(HEURISTIC_TASK_PROGRESS_REPOSITORY)
    private readonly repository: HeuristicTaskProgressRepository,
  ) {}

  async execute(dto: CreateTaskProgressDto): Promise<HeuristicTaskProgress> {
    const existing = await this.repository.findByEvaluatorAndTask(
      dto.evaluatorId,
      dto.taskId,
    );

    if (existing) {
      throw new ConflictException(
        'Ya existe un progreso para este evaluador y tarea',
      );
    }

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