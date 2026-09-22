import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeuristicTaskTypeorm } from './infrastructure/typeorm/heuristic-task.typeorm.entity';
import { HeuristicTaskRepositoryImpl } from './infrastructure/repositories/heuristic-task.repository.impl';
import { HEURISTIC_TASK_REPOSITORY } from './domain/interfaces/heuristic-task.repository';
import { HeuristicTaskController } from './presentation/controllers/heuristic-task.controller';
import { CreateHeuristicTaskUseCase } from './application/use-cases/create-heuristic-task.use-case';
import { FindAllTasksByEvaluationUseCase } from './application/use-cases/find-all-tasks-by-evaluation.use-case';
import { FindHeuristicTaskUseCase } from './application/use-cases/find-heuristic-task.use-case';
import { UpdateHeuristicTaskUseCase } from './application/use-cases/update-heuristic-task.use-case';
import { UpdateTaskStatusUseCase } from './application/use-cases/update-task-status.use-case';
import { ReorderTasksUseCase } from './application/use-cases/reorder-tasks.use-case';
import { DeleteHeuristicTaskUseCase } from './application/use-cases/delete-heuristic-task.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([HeuristicTaskTypeorm])],
  controllers: [HeuristicTaskController],
  providers: [
    // Use Cases
    CreateHeuristicTaskUseCase,
    FindAllTasksByEvaluationUseCase,
    FindHeuristicTaskUseCase,
    UpdateHeuristicTaskUseCase,
    UpdateTaskStatusUseCase,
    ReorderTasksUseCase,
    DeleteHeuristicTaskUseCase,
    // Repository
    {
      provide: HEURISTIC_TASK_REPOSITORY,
      useClass: HeuristicTaskRepositoryImpl,
    },
  ],
  exports: [HEURISTIC_TASK_REPOSITORY],
})
export class HeuristicTasksModule {}