// findings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindingController } from './presentation/controllers/finding.controller';
import { FindingRepository } from './infrastructure/repositories/finding.repository.impl';
import { FindingOrmEntity } from './infrastructure/typeorm/finding.orm-entity';
import { IFindingRepository } from './domain/interfaces/finding.repository';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';
import { CreateFindingUseCase } from './application/use-cases/create-finding.use-case';
import { UpdateFindingUseCase } from './application/use-cases/update-finding.use-case';
import { UpdateFindingStatusUseCase } from './application/use-cases/update-finding-status.use-case';
import { DeleteFindingUseCase } from './application/use-cases/delete-finding.use-case';
import { FindAllFindingsUseCase } from './application/use-cases/find-all-findings.use-case';
import { FindFindingByIdUseCase } from './application/use-cases/find-finding-by-id.use-case';
import { FindFindingsByEvaluationUseCase } from './application/use-cases/find-findings-by-evaluation.use-case';
import { FindFindingsBySessionUseCase } from './application/use-cases/find-findings-by-session.use-case';
import { FindFindingsByTaskUseCase } from './application/use-cases/find-findings-by-task.use-case';
import { GetFindingSummaryUseCase } from './application/use-cases/get-finding-summary.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([FindingOrmEntity]),
  ],
  controllers: [FindingController],
  providers: [
    {
      provide: INJECTION_TOKENS.FINDING_REPOSITORY,
      useClass: FindingRepository,
    },
    CreateFindingUseCase,
    UpdateFindingUseCase,
    UpdateFindingStatusUseCase,
    DeleteFindingUseCase,
    FindAllFindingsUseCase,
    FindFindingByIdUseCase,
    FindFindingsByEvaluationUseCase,
    FindFindingsBySessionUseCase,
    FindFindingsByTaskUseCase,
    GetFindingSummaryUseCase,
  ],
  exports: [
    INJECTION_TOKENS.FINDING_REPOSITORY,
    CreateFindingUseCase,
    FindFindingsByEvaluationUseCase,
    GetFindingSummaryUseCase,
  ],
})
export class FindingsModule {}