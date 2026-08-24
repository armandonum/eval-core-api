// cognitive-rule.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitiveRuleController } from './presentation/controllers/cognitive-rule.controller';
import { CognitiveRuleRepository } from './infrastructure/repositories/cognitive-rule.repository.impl';
import { CognitiveRuleOrmEntity } from './infrastructure/typeorm/cognitive-rule.orm-entity';
import { ICognitiveRuleRepository } from './domain/interfaces/cognitive-rule.repository';
import { CognitiveEvaluationModule } from '../cognitive-evaluation/cognitive-evaluation.module';
import { CreateCognitiveRuleUseCase } from './application/use-cases/create-cognitive-rule.use-case';
import { UpdateCognitiveRuleUseCase } from './application/use-cases/update-cognitive-rule.use-case';
import { DeleteCognitiveRuleUseCase } from './application/use-cases/delete-cognitive-rule.use-case';
import { FindAllCognitiveRulesUseCase } from './application/use-cases/find-all-cognitive-rules.use-case';
import { FindCognitiveRuleByIdUseCase } from './application/use-cases/find-cognitive-rule-by-id.use-case';
import { FindCognitiveRulesByEvaluationUseCase } from './application/use-cases/find-cognitive-rules-by-evaluation.use-case';
import { ReorderCognitiveRulesUseCase } from './application/use-cases/reorder-cognitive-rules.use-case';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Module({
  imports: [
    TypeOrmModule.forFeature([CognitiveRuleOrmEntity]),
    CognitiveEvaluationModule, // Para usar el repositorio de evaluaciones
  ],
  controllers: [CognitiveRuleController],
  providers: [
    // Repositories
    {
      provide: INJECTION_TOKENS.COGNITIVE_RULES,
      useClass: CognitiveRuleRepository,
    },
    // Use Cases
    CreateCognitiveRuleUseCase,
    UpdateCognitiveRuleUseCase,
    DeleteCognitiveRuleUseCase,
    FindAllCognitiveRulesUseCase,
    FindCognitiveRuleByIdUseCase,
    FindCognitiveRulesByEvaluationUseCase,
    ReorderCognitiveRulesUseCase,
  ],
  exports: [
    INJECTION_TOKENS.COGNITIVE_RULES,
    CreateCognitiveRuleUseCase,
    FindCognitiveRulesByEvaluationUseCase,
  ],
})
export class CognitiveRuleModule {}