import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeuristicObservationTypeorm } from './infrastructure/typeorm/heuristic-observation.typeorm.entity';
import { HeuristicObservationRepositoryImpl } from './infrastructure/repositories/heuristic-observation.repository.impl';
import { HEURISTIC_OBSERVATION_REPOSITORY } from './domain/interfaces/heuristic-observation.repository';
import { HeuristicObservationController } from './presentation/controllers/heuristic-observation.controller';
import { CreateHeuristicObservationUseCase } from './application/use-cases/create-heuristic-observation.use-case';
import { FindAllObservationsByEvaluationUseCase } from './application/use-cases/find-all-observations-by-evaluation.use-case';
import { FindAllObservationsBySessionUseCase } from './application/use-cases/find-all-observations-by-session.use-case';
import { FindAllObservationsByPrincipleUseCase } from './application/use-cases/find-all-observations-by-principle.use-case';
import { FindHeuristicObservationUseCase } from './application/use-cases/find-heuristic-observation.use-case';
import { UpdateHeuristicObservationUseCase } from './application/use-cases/update-heuristic-observation.use-case';
import { DeleteHeuristicObservationUseCase } from './application/use-cases/delete-heuristic-observation.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([HeuristicObservationTypeorm])],
  controllers: [HeuristicObservationController],
  providers: [
    // Use Cases
    CreateHeuristicObservationUseCase,
    FindAllObservationsByEvaluationUseCase,
    FindAllObservationsBySessionUseCase,
    FindAllObservationsByPrincipleUseCase,
    FindHeuristicObservationUseCase,
    UpdateHeuristicObservationUseCase,
    DeleteHeuristicObservationUseCase,
    // Repository
    {
      provide: HEURISTIC_OBSERVATION_REPOSITORY,
      useClass: HeuristicObservationRepositoryImpl,
    },
  ],
  exports: [HEURISTIC_OBSERVATION_REPOSITORY],
})
export class HeuristicObservationsModule {}