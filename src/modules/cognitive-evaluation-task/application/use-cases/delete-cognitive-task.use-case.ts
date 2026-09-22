
// application/use-cases/delete-cognitive-task.use-case.ts
import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ICognitiveTaskRepository } from '../../domain/interfaces/cognitive-task.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class DeleteCognitiveTaskUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_TASK)
    private readonly repository: ICognitiveTaskRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new NotFoundException('Cognitive task not found');
    }

    // No se pueden eliminar tareas completadas
    if (task.isCompleted()) {
      throw new ForbiddenException('Cannot delete a completed task');
    }

    await this.repository.delete(id);
  }
}
