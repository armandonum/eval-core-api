import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeuristicFinalResultTypeorm } from './infrastructure/typeorm/heuristic-final-result.typeorm.entity';
import { HeuristicFinalResultRepositoryImpl } from './infrastructure/repositories/heuristic-final-result.repository.impl';
import { HEURISTIC_FINAL_RESULT_REPOSITORY } from './domain/interfaces/heuristic-final-result.repository';
import { HeuristicFinalResultController } from './presentation/controllers/heuristic-final-result.controller';
import { GenerateFinalResultsUseCase } from './application/use-cases/generate-final-results.use-case';
import { FindFinalResultsByEvaluationUseCase } from './application/use-cases/find-final-results-by-evaluation.use-case';
import { FindFinalResultsUseCase } from './application/use-cases/find-final-results.use-case';
import { RecalculateFinalResultsUseCase } from './application/use-cases/recalculate-final-results.use-case';
import { UpdateFinalResultStatusUseCase } from './application/use-cases/update-final-result-status.use-case';
import { DeleteFinalResultsUseCase } from './application/use-cases/delete-final-results.use-case';

// Importar repositorios de otros módulos para inyección
import { HeuristicObservationsModule } from '../heuristic-observations/heuristic-observations.module';
import { HeuristicPositiveAspectsModule } from '../heuristic-positive-aspects/heuristic-positive-aspects.module';
import { HeuristicRatingsModule } from '../heuristic-ratings/heuristic-ratings.module';
import { HeuristicPrinciplesModule } from '../heuristic-principles/heuristic-principles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HeuristicFinalResultTypeorm]),
    HeuristicObservationsModule,
    HeuristicPositiveAspectsModule,
    HeuristicRatingsModule,
    HeuristicPrinciplesModule,
  ],
  controllers: [HeuristicFinalResultController],
  providers: [
    // Use Cases
    GenerateFinalResultsUseCase,
    FindFinalResultsByEvaluationUseCase,
    FindFinalResultsUseCase,
    RecalculateFinalResultsUseCase,
    UpdateFinalResultStatusUseCase,
    DeleteFinalResultsUseCase,
    // Repository
    {
      provide: HEURISTIC_FINAL_RESULT_REPOSITORY,
      useClass: HeuristicFinalResultRepositoryImpl,
    },
  ],
  exports: [HEURISTIC_FINAL_RESULT_REPOSITORY],
})
export class HeuristicFinalResultsModule {}