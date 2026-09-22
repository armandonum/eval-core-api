import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeuristicEvaluatorTypeorm } from './infrastructure/typeorm/heuristic-evaluator.typeorm.entity';
import { HeuristicEvaluatorRepositoryImpl } from './infrastructure/repositories/heuristic-evaluator.repository.impl';
import { HEURISTIC_EVALUATOR_REPOSITORY } from './domain/interfaces/heuristic-evaluator.repository';
import { HeuristicEvaluatorController } from './presentation/controllers/heuristic-evaluator.controller';
import { AssignEvaluatorUseCase } from './application/use-cases/assign-evaluator.use-case';
import { FindAllEvaluatorsByEvaluationUseCase } from './application/use-cases/find-all-evaluators-by-evaluation.use-case';
import { FindEvaluatorUseCase } from './application/use-cases/find-evaluator.use-case';
import { UpdateEvaluatorUseCase } from './application/use-cases/update-evaluator.use-case';
import { MarkEvaluatorCompletedUseCase } from './application/use-cases/mark-evaluator-completed.use-case';
import { DeleteEvaluatorUseCase } from './application/use-cases/delete-evaluator.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([HeuristicEvaluatorTypeorm])],
  controllers: [HeuristicEvaluatorController],
  providers: [
    // Use Cases
    AssignEvaluatorUseCase,
    FindAllEvaluatorsByEvaluationUseCase,
    FindEvaluatorUseCase,
    UpdateEvaluatorUseCase,
    MarkEvaluatorCompletedUseCase,
    DeleteEvaluatorUseCase,
    // Repository
    {
      provide: HEURISTIC_EVALUATOR_REPOSITORY,
      useClass: HeuristicEvaluatorRepositoryImpl,
    },
  ],
  exports: [HEURISTIC_EVALUATOR_REPOSITORY],
})
export class HeuristicEvaluatorsModule {}