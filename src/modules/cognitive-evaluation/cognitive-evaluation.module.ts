// cognitive-evaluation/cognitive-evaluation.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitiveEvaluationController } from './presentation/controllers/cognitive-evaluation.controller';
import { CognitiveEvaluationRepository } from './infrastructure/repositories/cognitive-evaluation.repository.impl';
import { CognitiveEvaluationOrmEntity } from './infrastructure/typeorm/cognitive-evaluation.orm-entity';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';
import { CognitiveEvaluatorModule } from '../cognitive-evaluator/cognitive-evaluator.module'; // 🔥 Importar con forwardRef
import { CreateCognitiveEvaluationUseCase } from './application/use-cases/create-cognitive-evaluation.use-case';
import { UpdateCognitiveEvaluationUseCase } from './application/use-cases/update-cognitive-evaluation.use-case';
import { UpdateCognitiveEvaluationStatusUseCase } from './application/use-cases/update-cognitive-evaluation-status.use-case';
import { DeleteCognitiveEvaluationUseCase } from './application/use-cases/delete-cognitive-evaluation.use-case';
import { FindAllCognitiveEvaluationsUseCase } from './application/use-cases/find-all-cognitive-evaluations.use-case';
import { FindCognitiveEvaluationByIdUseCase } from './application/use-cases/find-cognitive-evaluation-by-id.use-case';
import { FindCognitiveEvaluationsByProjectUseCase } from './application/use-cases/find-cognitive-evaluations-by-project.use-case';
import { FindMyAssignedEvaluationsUseCase } from './application/use-cases/find-my-assigned-evaluations.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CognitiveEvaluationOrmEntity,
    ]),
    // 🔥 Usar forwardRef para evitar dependencia circular
    forwardRef(() => CognitiveEvaluatorModule),
  ],
  controllers: [CognitiveEvaluationController],
  providers: [
    {
      provide: INJECTION_TOKENS.COGNITIVE_EVALUATIONS,
      useClass: CognitiveEvaluationRepository,
    },
    CreateCognitiveEvaluationUseCase,
    UpdateCognitiveEvaluationUseCase,
    UpdateCognitiveEvaluationStatusUseCase,
    DeleteCognitiveEvaluationUseCase,
    FindAllCognitiveEvaluationsUseCase,
    FindCognitiveEvaluationByIdUseCase,
    FindCognitiveEvaluationsByProjectUseCase,
    FindMyAssignedEvaluationsUseCase,
  ],
  exports: [
    INJECTION_TOKENS.COGNITIVE_EVALUATIONS,
    CreateCognitiveEvaluationUseCase,
    FindCognitiveEvaluationByIdUseCase,
    FindMyAssignedEvaluationsUseCase,
  ],
})
export class CognitiveEvaluationModule {}