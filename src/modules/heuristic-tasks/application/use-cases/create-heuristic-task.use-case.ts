import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicTaskRepository,
  HEURISTIC_TASK_REPOSITORY,
} from '../../domain/interfaces/heuristic-task.repository';
import { HeuristicTask } from '../../domain/entities/heuristic-task.entity';
import { CreateHeuristicTaskDto } from '../dtos/create-heuristic-task.dto';

@Injectable()
export class CreateHeuristicTaskUseCase {
  constructor(
    @Inject(HEURISTIC_TASK_REPOSITORY)
    private readonly repository: HeuristicTaskRepository,
  ) {}

  async execute(dto: CreateHeuristicTaskDto): Promise<HeuristicTask> {
    // Si no se proporciona orderIndex, calcular el siguiente automáticamente
    let orderIndex = dto.orderIndex;
    if (!orderIndex) {
      const maxOrder = await this.repository.findMaxOrderIndex(dto.evaluationId);
      orderIndex = maxOrder + 1;
    }

    const task = HeuristicTask.create(
      dto.evaluationId,
      dto.projectTaskId ?? null,
      dto.title,
      dto.description ?? null,
      dto.userGoal ?? null,
      orderIndex,
    );

    return this.repository.create(task);
  }
}