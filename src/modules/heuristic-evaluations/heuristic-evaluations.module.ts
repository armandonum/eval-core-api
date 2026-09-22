import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeuristicEvaluationTypeorm } from './infrastructure/typeorm/heuristic-evaluation.typeorm.entity';
import { HeuristicEvaluationRepositoryImpl } from './infrastructure/repositories/heuristic-evaluation.repository.impl';
import { HeuristicEvaluationController } from './presentation/controllers/heuristic-evaluation.controller';
import { CreateHeuristicEvaluationUseCase } from './application/use-cases/create-heuristic-evaluation.use-case';
import { FindAllHeuristicEvaluationsUseCase } from './application/use-cases/find-all-heuristic-evaluations.use-case';
import { FindEvaluationsBySupervisorUseCase } from './application/use-cases/find-evaluations-by-supervisor.use-case';
import { FindEvaluationsByProjectUseCase } from './application/use-cases/find-evaluations-by-project.use-case';
import { FindHeuristicEvaluationUseCase } from './application/use-cases/find-heuristic-evaluation.use-case';
import { UpdateHeuristicEvaluationUseCase } from './application/use-cases/update-heuristic-evaluation.use-case';
import { UpdateEvaluationStatusUseCase } from './application/use-cases/update-evaluation-status.use-case';
import { DeleteHeuristicEvaluationUseCase } from './application/use-cases/delete-heuristic-evaluation.use-case';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Module({
  imports: [TypeOrmModule.forFeature([HeuristicEvaluationTypeorm])],
  controllers: [HeuristicEvaluationController],
  providers: [
    // Use Cases
    CreateHeuristicEvaluationUseCase,
    FindAllHeuristicEvaluationsUseCase,
    FindEvaluationsBySupervisorUseCase,
    FindEvaluationsByProjectUseCase,
    FindHeuristicEvaluationUseCase,
    UpdateHeuristicEvaluationUseCase,
    UpdateEvaluationStatusUseCase,
    DeleteHeuristicEvaluationUseCase,
    // Repository
    {
      provide: INJECTION_TOKENS.HEURISTIC_EVALUATION_REPOSITORY,
      useClass: HeuristicEvaluationRepositoryImpl,
    },
  ],
  exports: [INJECTION_TOKENS.HEURISTIC_EVALUATION_REPOSITORY],
})
export class HeuristicEvaluationsModule {}