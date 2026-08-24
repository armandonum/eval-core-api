// cognitive-response.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitiveResponseController } from './presentation/controllers/cognitive-response.controller';
import { CognitiveResponseRepository } from './infrastructure/repositories/cognitive-response.repository.impl';
import { CognitiveResponseOrmEntity } from './infrastructure/typeorm/cognitive-response.orm-entity';
import { ICognitiveResponseRepository } from './domain/interfaces/cognitive-response.repository';
import { CognitiveEvaluationModule } from '../cognitive-evaluation/cognitive-evaluation.module';
import { CognitiveTaskModule } from '../cognitive-evaluation-task/cognitive-task.module';
import { CognitiveEvaluatorModule } from '../cognitive-evaluator/cognitive-evaluator.module';
import { CreateCognitiveResponseUseCase } from './application/use-cases/create-cognitive-response.use-case';
import { CompleteCognitiveResponseUseCase } from './application/use-cases/complete-cognitive-response.use-case';
import { UpdateCognitiveResponseUseCase } from './application/use-cases/update-cognitive-response.use-case';
import { DeleteCognitiveResponseUseCase } from './application/use-cases/delete-cognitive-response.use-case';
import { FindAllCognitiveResponsesUseCase } from './application/use-cases/find-all-cognitive-responses.use-case';
import { FindCognitiveResponseByIdUseCase } from './application/use-cases/find-cognitive-response-by-id.use-case';
import { FindCognitiveResponsesByEvaluationUseCase } from './application/use-cases/find-cognitive-responses-by-evaluation.use-case';
import { FindCognitiveResponsesByEvaluatorUseCase } from './application/use-cases/find-cognitive-responses-by-evaluator.use-case';
import { FindCognitiveResponsesByTaskUseCase } from './application/use-cases/find-cognitive-responses-by-task.use-case';
import { GetResponseSummaryUseCase } from './application/use-cases/get-response-summary.use-case';
import { GetResponseStatsUseCase } from './application/use-cases/get-response-stats.use-case';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([CognitiveResponseOrmEntity]),
    CognitiveEvaluationModule,
    CognitiveTaskModule,
    CognitiveEvaluatorModule,
  ],
  controllers: [CognitiveResponseController],
  providers: [
    // Repositories
    {
      provide: INJECTION_TOKENS.COGNITIVE_RESPONSES,
      useClass: CognitiveResponseRepository,
    },
    // Use Cases
    CreateCognitiveResponseUseCase,
    CompleteCognitiveResponseUseCase,
    UpdateCognitiveResponseUseCase,
    DeleteCognitiveResponseUseCase,
    FindAllCognitiveResponsesUseCase,
    FindCognitiveResponseByIdUseCase,
    FindCognitiveResponsesByEvaluationUseCase,
    FindCognitiveResponsesByEvaluatorUseCase,
    FindCognitiveResponsesByTaskUseCase,
    GetResponseSummaryUseCase,
    GetResponseStatsUseCase,
  ],
  exports: [
    INJECTION_TOKENS.COGNITIVE_RESPONSES,
    CreateCognitiveResponseUseCase,
    FindCognitiveResponsesByEvaluationUseCase,
  ],
})
export class CognitiveResponseModule {}