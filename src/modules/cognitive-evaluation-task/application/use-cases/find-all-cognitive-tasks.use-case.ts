// application/use-cases/find-all-cognitive-tasks.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ICognitiveTaskRepository } from '../../domain/interfaces/cognitive-task.repository';
import { CognitiveTask } from '../../domain/entities/cognitive-task.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class FindAllCognitiveTasksUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_TASK)
    private readonly repository: ICognitiveTaskRepository,
  ) {}

  async execute(): Promise<CognitiveTask[]> {
    return this.repository.findAll();
  }
}
