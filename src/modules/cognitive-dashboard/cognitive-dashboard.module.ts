// cognitive-dashboard.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitiveDashboardController } from './presentation/controllers/cognitive-dashboard.controller';
import { CognitiveDashboardRepository } from './infrastructure/repositories/cognitive-dashboard.repository.impl';
import { CognitiveDashboardOrmEntity } from './infrastructure/typeorm/cognitive-dashboard.orm-entity';
import { ICognitiveDashboardRepository } from './domain/interfaces/cognitive-dashboard.repository';
import { GetCognitiveDashboardUseCase } from './application/use-cases/get-cognitive-dashboard.use-case';
import { UpdateCognitiveDashboardUseCase } from './application/use-cases/update-cognitive-dashboard.use-case';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([CognitiveDashboardOrmEntity]),
  ],
  controllers: [CognitiveDashboardController],
  providers: [
    {
      provide: INJECTION_TOKENS.COGNITIVE_DASHBOARD,
      useClass: CognitiveDashboardRepository,
    },
    GetCognitiveDashboardUseCase,
    UpdateCognitiveDashboardUseCase,
  ],
  exports: [
    INJECTION_TOKENS.COGNITIVE_DASHBOARD,
    GetCognitiveDashboardUseCase,
  ],
})
export class CognitiveDashboardModule {}