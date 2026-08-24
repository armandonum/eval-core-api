// cognitive-problem.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitiveProblemController } from './presentation/controllers/cognitive-problem.controller';
import { CognitiveProblemRepository } from './infrastructure/repositories/cognitive-problem.repository.impl';
import { CognitiveProblemOrmEntity } from './infrastructure/typeorm/cognitive-problem.orm-entity';
import { ICognitiveProblemRepository } from './domain/interfaces/cognitive-problem.repository';
import { CognitiveEvaluationModule } from '../cognitive-evaluation/cognitive-evaluation.module';
import { CognitiveTaskModule } from '../cognitive-evaluation-task/cognitive-task.module';
import { CreateCognitiveProblemUseCase } from './application/use-cases/create-cognitive-problem.use-case';
import { UpdateCognitiveProblemUseCase } from './application/use-cases/update-cognitive-problem.use-case';
import { UpdateCognitiveProblemStatusUseCase } from './application/use-cases/update-cognitive-problem-status.use-case';
import { DeleteCognitiveProblemUseCase } from './application/use-cases/delete-cognitive-problem.use-case';
import { FindAllCognitiveProblemsUseCase } from './application/use-cases/find-all-cognitive-problems.use-case';
import { FindCognitiveProblemByIdUseCase } from './application/use-cases/find-cognitive-problem-by-id.use-case';
import { FindCognitiveProblemsByEvaluationUseCase } from './application/use-cases/find-cognitive-problems-by-evaluation.use-case';
import { GetProblemSummaryUseCase } from './application/use-cases/get-problem-summary.use-case';
import { UnifyCognitiveProblemsUseCase } from './application/use-cases/unify-cognitive-problems.use-case';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([CognitiveProblemOrmEntity]),
    CognitiveEvaluationModule,
    CognitiveTaskModule,
  ],
  controllers: [CognitiveProblemController],
  providers: [
    // Repositories
    {
      provide: INJECTION_TOKENS.COGNITIVE_PROBLEMS,
      useClass: CognitiveProblemRepository,
    },
    // Use Cases
    CreateCognitiveProblemUseCase,
    UpdateCognitiveProblemUseCase,
    UpdateCognitiveProblemStatusUseCase,
    DeleteCognitiveProblemUseCase,
    FindAllCognitiveProblemsUseCase,
    FindCognitiveProblemByIdUseCase,
    FindCognitiveProblemsByEvaluationUseCase,
    GetProblemSummaryUseCase,
    UnifyCognitiveProblemsUseCase,
  ],
  exports: [
    INJECTION_TOKENS.COGNITIVE_PROBLEMS,
    CreateCognitiveProblemUseCase,
    FindCognitiveProblemsByEvaluationUseCase,
  ],
})
export class CognitiveProblemModule {}