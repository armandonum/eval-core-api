// cognitive-action.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitiveActionController } from './presentation/controllers/cognitive-action.controller';
import { CognitiveActionRepository } from './infrastructure/repositories/cognitive-action.repository.impl';
import { CognitiveActionOrmEntity } from './infrastructure/typeorm/cognitive-action.orm-entity';
import { ICognitiveActionRepository } from './domain/interfaces/cognitive-action.repository';
import { CognitiveTaskModule } from '../cognitive-evaluation-task/cognitive-task.module';
import { CreateCognitiveActionUseCase } from './application/use-cases/create-cognitive-action.use-case';
import { UpdateCognitiveActionUseCase } from './application/use-cases/update-cognitive-action.use-case';
import { DeleteCognitiveActionUseCase } from './application/use-cases/delete-cognitive-action.use-case';
import { FindAllCognitiveActionsUseCase } from './application/use-cases/find-all-cognitive-actions.use-case';
import { FindCognitiveActionByIdUseCase } from './application/use-cases/find-cognitive-action-by-id.use-case';
import { FindCognitiveActionsByTaskUseCase } from './application/use-cases/find-cognitive-actions-by-task.use-case';
import { ReorderCognitiveActionsUseCase } from './application/use-cases/reorder-cognitive-actions.use-case';
import { DuplicateCognitiveActionsUseCase } from './application/use-cases/duplicate-cognitive-actions.use-case';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([CognitiveActionOrmEntity]),
    CognitiveTaskModule, 
  ],
  controllers: [CognitiveActionController],
  providers: [
    {
      provide: INJECTION_TOKENS.COGNITIVE_EVALUATION_ACTION,
      useClass: CognitiveActionRepository,
    },
    CreateCognitiveActionUseCase,
    UpdateCognitiveActionUseCase,
    DeleteCognitiveActionUseCase,
    FindAllCognitiveActionsUseCase,
    FindCognitiveActionByIdUseCase,
    FindCognitiveActionsByTaskUseCase,
    ReorderCognitiveActionsUseCase,
    DuplicateCognitiveActionsUseCase,
  ],
  exports: [
    INJECTION_TOKENS.COGNITIVE_EVALUATION_ACTION,
    CreateCognitiveActionUseCase,
    FindCognitiveActionsByTaskUseCase,
  ],
})
export class CognitiveActionModule {}