import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GazeAoiMetricTypeorm } from './infrastructure/typeorm/gaze-aoi-metric.typeorm.entity';
import { GazeAoiMetricRepositoryImpl } from './infrastructure/repositories/gaze-aoi-metric.repository.impl';
import { GAZE_AOI_METRIC_REPOSITORY } from './domain/interfaces/gaze-aoi-metric.repository';
import { GazeAoiMetricController } from './presentation/controllers/gaze-aoi-metric.controller';
import { CalculateAoiMetricsUseCase } from './application/use-cases/calculate-aoi-metrics.use-case';
import { CreateGazeAoiMetricUseCase } from './application/use-cases/create-gaze-aoi-metric.use-case';
import { FindAllAoiMetricsUseCase } from './application/use-cases/find-all-aoi-metrics.use-case';
import { FindAoiMetricsBySessionUseCase } from './application/use-cases/find-aoi-metrics-by-session.use-case';
import { FindGazeAoiMetricUseCase } from './application/use-cases/find-gaze-aoi-metric.use-case';
import { UpdateGazeAoiMetricUseCase } from './application/use-cases/update-gaze-aoi-metric.use-case';
import { DeleteGazeAoiMetricUseCase } from './application/use-cases/delete-gaze-aoi-metric.use-case';

// 🔥 Importar módulos de dependencias
import { GazeEventsModule } from '../gaze-events/gaze-events.module';
import { AoiDefinitionsModule } from '../aoi-definitions/aoi-definitions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GazeAoiMetricTypeorm]),
    // 🔥 Necesitamos los repositorios de gaze_events y aoi_definitions
    GazeEventsModule,
    AoiDefinitionsModule,
  ],
  controllers: [GazeAoiMetricController],
  providers: [
    // Use Cases
    CalculateAoiMetricsUseCase,
    CreateGazeAoiMetricUseCase,
    FindAllAoiMetricsUseCase,
    FindAoiMetricsBySessionUseCase,
    FindGazeAoiMetricUseCase,
    UpdateGazeAoiMetricUseCase,
    DeleteGazeAoiMetricUseCase,
    // Repository
    {
      provide: GAZE_AOI_METRIC_REPOSITORY,
      useClass: GazeAoiMetricRepositoryImpl,
    },
  ],
  exports: [GAZE_AOI_METRIC_REPOSITORY],
})
export class GazeAoiMetricsModule {}