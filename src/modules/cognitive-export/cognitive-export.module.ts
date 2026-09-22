// cognitive-export.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitiveExportController } from './presentation/controllers/cognitive-export.controller';
import { CognitiveExportRepository } from './infrastructure/repositories/cognitive-export.repository.impl';
import { ICognitiveExportRepository } from './domain/interfaces/cognitive-export.repository';
import { ExportCognitiveEvaluationUseCase } from './application/use-cases/export-cognitive-evaluation.use-case';
import { CognitiveEvaluationOrmEntity } from '../cognitive-evaluation/infrastructure/typeorm/cognitive-evaluation.orm-entity';
import { CognitiveTaskOrmEntity } from '../cognitive-evaluation-task/infrastructure/typeorm/cognitive-task.orm-entity';
import { CognitiveResponseOrmEntity } from '../cognitive-response/infrastructure/typeorm/cognitive-response.orm-entity';
import { CognitiveEvaluatorOrmEntity } from '../cognitive-evaluator/infrastructure/typeorm/cognitive-evaluator.orm-entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CognitiveEvaluationOrmEntity,
      CognitiveTaskOrmEntity,
      CognitiveResponseOrmEntity,
      CognitiveEvaluatorOrmEntity,
    ]),
  ],
  controllers: [CognitiveExportController],
  providers: [
    {
      provide: INJECTION_TOKENS.COGNITIVE_EXPORT,
      useClass: CognitiveExportRepository,
    },
    ExportCognitiveEvaluationUseCase,
  ],
  exports: [
    INJECTION_TOKENS.COGNITIVE_EXPORT,
    ExportCognitiveEvaluationUseCase,
  ],
})
export class CognitiveExportModule {}