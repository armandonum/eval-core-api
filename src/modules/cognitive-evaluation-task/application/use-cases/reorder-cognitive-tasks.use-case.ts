
// application/use-cases/reorder-cognitive-tasks.use-case.ts
import { Injectable,Inject, NotFoundException } from '@nestjs/common';
import { ICognitiveTaskRepository } from '../../domain/interfaces/cognitive-task.repository';
import { ReorderTasksDto } from '../dtos/reorder-tasks.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class ReorderCognitiveTasksUseCase {
  constructor(    @Inject(INJECTION_TOKENS.COGNITIVE_TASK)

    private readonly repository: ICognitiveTaskRepository,
  ) {}

  async execute(evaluationId: string, dto: ReorderTasksDto): Promise<void> {
    // Verificar que todas las tareas existen
    const tasks = await this.repository.findByEvaluation(evaluationId);
    const taskIds = tasks.map(t => t.id);
    
    for (const id of dto.taskIds) {
      if (!taskIds.includes(id)) {
        throw new NotFoundException(`Task with id ${id} not found in this evaluation`);
      }
    }

    // Reordenar
    await this.repository.reorderTasks(evaluationId, dto.taskIds);
  }
}