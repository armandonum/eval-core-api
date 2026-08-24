// cognitive-evaluation-task/cognitive-task.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitiveTaskController } from './presentation/controllers/cognitive-task.controller';
import { CognitiveTaskRepository } from './infrastructure/repositories/cognitive-task.repository.impl';
import { CognitiveTaskOrmEntity } from './infrastructure/typeorm/cognitive-task.orm-entity';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';
import { CognitiveEvaluationModule } from '../cognitive-evaluation/cognitive-evaluation.module';
import { CreateCognitiveTaskUseCase } from './application/use-cases/create-cognitive-task.use-case';
import { UpdateCognitiveTaskUseCase } from './application/use-cases/update-cognitive-task.use-case';
import { UpdateCognitiveTaskStatusUseCase } from './application/use-cases/update-cognitive-task-status.use-case';
import { DeleteCognitiveTaskUseCase } from './application/use-cases/delete-cognitive-task.use-case';
import { FindAllCognitiveTasksUseCase } from './application/use-cases/find-all-cognitive-tasks.use-case';
import { FindCognitiveTaskByIdUseCase } from './application/use-cases/find-cognitive-task-by-id.use-case';
import { FindCognitiveTasksByEvaluationUseCase } from './application/use-cases/find-cognitive-tasks-by-evaluation.use-case';
import { ReorderCognitiveTasksUseCase } from './application/use-cases/reorder-cognitive-tasks.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([CognitiveTaskOrmEntity]),
    forwardRef(() => CognitiveEvaluationModule),
  ],
  controllers: [CognitiveTaskController],
  providers: [
    {
      provide: INJECTION_TOKENS.COGNITIVE_TASK,
      useClass: CognitiveTaskRepository,
    },
    CreateCognitiveTaskUseCase,
    UpdateCognitiveTaskUseCase,
    UpdateCognitiveTaskStatusUseCase,
    DeleteCognitiveTaskUseCase,
    FindAllCognitiveTasksUseCase,
    FindCognitiveTaskByIdUseCase,
    FindCognitiveTasksByEvaluationUseCase,
    ReorderCognitiveTasksUseCase,
  ],
  exports: [
    INJECTION_TOKENS.COGNITIVE_TASK,
    CreateCognitiveTaskUseCase,
    FindCognitiveTasksByEvaluationUseCase,
  ],
})
export class CognitiveTaskModule {}