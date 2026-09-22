import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeuristicRatingTypeorm } from './infrastructure/typeorm/heuristic-rating.typeorm.entity';
import { HeuristicRatingRepositoryImpl } from './infrastructure/repositories/heuristic-rating.repository.impl';
import { HEURISTIC_RATING_REPOSITORY } from './domain/interfaces/heuristic-rating.repository';
import { HeuristicRatingController } from './presentation/controllers/heuristic-rating.controller';
import { CreateHeuristicRatingUseCase } from './application/use-cases/create-heuristic-rating.use-case';
import { FindAllRatingsByEvaluationUseCase } from './application/use-cases/find-all-ratings-by-evaluation.use-case';
import { FindAllRatingsByObservationUseCase } from './application/use-cases/find-all-ratings-by-observation.use-case';
import { FindHeuristicRatingUseCase } from './application/use-cases/find-heuristic-rating.use-case';
import { GetAverageRatingByObservationUseCase } from './application/use-cases/get-average-rating-by-observation.use-case';
import { UpdateHeuristicRatingUseCase } from './application/use-cases/update-heuristic-rating.use-case';
import { DeleteHeuristicRatingUseCase } from './application/use-cases/delete-heuristic-rating.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([HeuristicRatingTypeorm])],
  controllers: [HeuristicRatingController],
  providers: [
    // Use Cases
    CreateHeuristicRatingUseCase,
    FindAllRatingsByEvaluationUseCase,
    FindAllRatingsByObservationUseCase,
    FindHeuristicRatingUseCase,
    GetAverageRatingByObservationUseCase,
    UpdateHeuristicRatingUseCase,
    DeleteHeuristicRatingUseCase,
    // Repository
    {
      provide: HEURISTIC_RATING_REPOSITORY,
      useClass: HeuristicRatingRepositoryImpl,
    },
  ],
  exports: [HEURISTIC_RATING_REPOSITORY],
})
export class HeuristicRatingsModule {}