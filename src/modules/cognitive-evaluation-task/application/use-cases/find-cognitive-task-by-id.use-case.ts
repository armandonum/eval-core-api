
// application/use-cases/find-cognitive-task-by-id.use-case.ts
import { Injectable,Inject, NotFoundException } from '@nestjs/common';
import { ICognitiveTaskRepository } from '../../domain/interfaces/cognitive-task.repository';
import { CognitiveTask } from '../../domain/entities/cognitive-task.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class FindCognitiveTaskByIdUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_TASK)

    private readonly repository: ICognitiveTaskRepository,
  ) {}

  async execute(id: string): Promise<CognitiveTask> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new NotFoundException('Cognitive task not found');
    }
    return task;
  }
}