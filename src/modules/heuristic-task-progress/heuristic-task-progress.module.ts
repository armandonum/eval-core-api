import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeuristicTaskProgressTypeorm } from './infrastructure/typeorm/heuristic-task-progress.typeorm.entity';
import { HeuristicTaskProgressRepositoryImpl } from './infrastructure/repositories/heuristic-task-progress.repository.impl';
import { HEURISTIC_TASK_PROGRESS_REPOSITORY } from './domain/interfaces/heuristic-task-progress.repository';
import { HeuristicTaskProgressController } from './presentation/controllers/heuristic-task-progress.controller';
import { CreateTaskProgressUseCase } from './application/use-cases/create-task-progress.use-case';
import { UpsertTaskProgressUseCase } from './application/use-cases/upsert-task-progress.use-case';
import { FindProgressByEvaluatorUseCase } from './application/use-cases/find-progress-by-evaluator.use-case';
import { FindProgressByTaskUseCase } from './application/use-cases/find-progress-by-task.use-case';
import { FindProgressByEvaluationUseCase } from './application/use-cases/find-progress-by-evaluation.use-case';
import { FindMyProgressUseCase } from './application/use-cases/find-my-progress.use-case';
import { UpdateTaskProgressStatusUseCase } from './application/use-cases/update-task-progress-status.use-case';
import { DeleteTaskProgressUseCase } from './application/use-cases/delete-task-progress.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([HeuristicTaskProgressTypeorm])],
  controllers: [HeuristicTaskProgressController],
  providers: [
    // Use Cases
    CreateTaskProgressUseCase,
    UpsertTaskProgressUseCase,
    FindProgressByEvaluatorUseCase,
    FindProgressByTaskUseCase,
    FindProgressByEvaluationUseCase,
    FindMyProgressUseCase,
    UpdateTaskProgressStatusUseCase,
    DeleteTaskProgressUseCase,
    // Repository
    {
      provide: HEURISTIC_TASK_PROGRESS_REPOSITORY,
      useClass: HeuristicTaskProgressRepositoryImpl,
    },
  ],
  exports: [HEURISTIC_TASK_PROGRESS_REPOSITORY],
})
export class HeuristicTaskProgressModule {}