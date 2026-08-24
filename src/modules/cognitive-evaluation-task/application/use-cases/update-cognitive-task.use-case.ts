
// application/use-cases/update-cognitive-task.use-case.ts
import { Injectable,Inject, NotFoundException } from '@nestjs/common';
import { ICognitiveTaskRepository } from '../../domain/interfaces/cognitive-task.repository';
import { UpdateCognitiveTaskDto } from '../dtos/update-cognitive-task.dto';
import { CognitiveTask } from '../../domain/entities/cognitive-task.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class UpdateCognitiveTaskUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_TASK)

    private readonly repository: ICognitiveTaskRepository,
  ) {}

  async execute(id: string, dto: UpdateCognitiveTaskDto): Promise<CognitiveTask> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new NotFoundException('Cognitive task not found');
    }

    // Actualizar campos
    if (dto.title !== undefined || dto.description !== undefined || dto.userGoal !== undefined) {
      task.updateDetails(
        dto.title ?? task.title,
        dto.description ?? task.description,
        dto.userGoal ?? task.userGoal,
      );
    }

    if (dto.orderIndex !== undefined) {
      task.updateOrder(dto.orderIndex);
    }

    if (dto.status) {
      // Usar métodos de dominio para cambiar estado
      switch (dto.status) {
        case 'in_progress':
          task.start();
          break;
        case 'completed':
          task.complete();
          break;
        case 'failed':
          task.fail();
          break;
        case 'pending':
          // Solo actualizar si no está completado
          if (!task.isCompleted()) {
            task.status = dto.status;
            task.updatedAt = new Date();
          }
          break;
      }
    }

    return this.repository.update(task);
  }
}