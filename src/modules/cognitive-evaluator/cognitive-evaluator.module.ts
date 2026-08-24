// cognitive-evaluator/cognitive-evaluator.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitiveEvaluatorController } from './presentation/controllers/cognitive-evaluator.controller';
import { CognitiveEvaluatorRepository } from './infrastructure/repositories/cognitive-evaluator.repository.impl';
import { CognitiveEvaluatorOrmEntity } from './infrastructure/typeorm/cognitive-evaluator.orm-entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';
import { CognitiveEvaluationModule } from '../cognitive-evaluation/cognitive-evaluation.module';
import { CognitiveTaskModule } from '../cognitive-evaluation-task/cognitive-task.module'; // 🔥 Importar CognitiveTaskModule
import { AssignCognitiveEvaluatorUseCase } from './application/use-cases/assign-cognitive-evaluator.use-case';
import { UpdateCognitiveEvaluatorUseCase } from './application/use-cases/update-cognitive-evaluator.use-case';
import { RemoveCognitiveEvaluatorUseCase } from './application/use-cases/remove-cognitive-evaluator.use-case';
import { FindAllCognitiveEvaluatorsUseCase } from './application/use-cases/find-all-cognitive-evaluators.use-case';
import { FindCognitiveEvaluatorByIdUseCase } from './application/use-cases/find-cognitive-evaluator-by-id.use-case';
import { FindCognitiveEvaluatorsByEvaluationUseCase } from './application/use-cases/find-cognitive-evaluators-by-evaluation.use-case';
import { FindCognitiveEvaluatorsByUserUseCase } from './application/use-cases/find-cognitive-evaluators-by-user.use-case';
import { CompleteEvaluatorTaskUseCase } from './application/use-cases/complete-evaluator-task.use-case';
import { GetEvaluatorProgressUseCase } from './application/use-cases/get-evaluator-progress.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([CognitiveEvaluatorOrmEntity]),
    forwardRef(() => CognitiveEvaluationModule),
    // 🔥 Importar CognitiveTaskModule para tener acceso a COGNITIVE_TASK
    CognitiveTaskModule,
  ],
  controllers: [CognitiveEvaluatorController],
  providers: [
    {
      provide: INJECTION_TOKENS.COGNITIVE_EVALUATOR,
      useClass: CognitiveEvaluatorRepository,
    },
    AssignCognitiveEvaluatorUseCase,
    UpdateCognitiveEvaluatorUseCase,
    RemoveCognitiveEvaluatorUseCase,
    FindAllCognitiveEvaluatorsUseCase,
    FindCognitiveEvaluatorByIdUseCase,
    FindCognitiveEvaluatorsByEvaluationUseCase,
    FindCognitiveEvaluatorsByUserUseCase,
    CompleteEvaluatorTaskUseCase,
    GetEvaluatorProgressUseCase,
  ],
  exports: [
    INJECTION_TOKENS.COGNITIVE_EVALUATOR,
    AssignCognitiveEvaluatorUseCase,
    FindCognitiveEvaluatorsByEvaluationUseCase,
    FindCognitiveEvaluatorsByUserUseCase,
  ],
})
export class CognitiveEvaluatorModule {}