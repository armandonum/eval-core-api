import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeuristicPositiveAspectTypeorm } from './infrastructure/typeorm/heuristic-positive-aspect.typeorm.entity';
import { HeuristicPositiveAspectRepositoryImpl } from './infrastructure/repositories/heuristic-positive-aspect.repository.impl';
import { HEURISTIC_POSITIVE_ASPECT_REPOSITORY } from './domain/interfaces/heuristic-positive-aspect.repository';
import { HeuristicPositiveAspectController } from './presentation/controllers/heuristic-positive-aspect.controller';
import { CreatePositiveAspectUseCase } from './application/use-cases/create-positive-aspect.use-case';
import { FindAllAspectsByEvaluationUseCase } from './application/use-cases/find-all-aspects-by-evaluation.use-case';
import { FindAllAspectsBySessionUseCase } from './application/use-cases/find-all-aspects-by-session.use-case';
import { FindPositiveAspectUseCase } from './application/use-cases/find-positive-aspect.use-case';
import { UpdatePositiveAspectUseCase } from './application/use-cases/update-positive-aspect.use-case';
import { DeletePositiveAspectUseCase } from './application/use-cases/delete-positive-aspect.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([HeuristicPositiveAspectTypeorm])],
  controllers: [HeuristicPositiveAspectController],
  providers: [
    // Use Cases
    CreatePositiveAspectUseCase,
    FindAllAspectsByEvaluationUseCase,
    FindAllAspectsBySessionUseCase,
    FindPositiveAspectUseCase,
    UpdatePositiveAspectUseCase,
    DeletePositiveAspectUseCase,
    // Repository
    {
      provide: HEURISTIC_POSITIVE_ASPECT_REPOSITORY,
      useClass: HeuristicPositiveAspectRepositoryImpl,
    },
  ],
  exports: [HEURISTIC_POSITIVE_ASPECT_REPOSITORY],
})
export class HeuristicPositiveAspectsModule {}