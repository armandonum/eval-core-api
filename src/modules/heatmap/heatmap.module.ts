// src/modules/heatmap/heatmap.module.ts

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { HeatmapController } from './presentation/controllers/heatmap.controller'

import { HeatmapEventTypeormEntity } from './infrastructure/typeorm/heatmap-event.typeorm.entity'
import { HeatmapImageTypeormEntity } from './infrastructure/typeorm/heatmap-image.typeorm.entity'
import { HeatmapEventRepositoryImpl } from './infrastructure/repositories/heatmap-event.repository.impl'
import { HeatmapImageRepositoryImpl } from './infrastructure/repositories/heatmap-image.repository.impl'

import { CreateHeatmapEventUseCase } from './application/use-cases/create-heatmap-event.use-case'
import { GetHeatmapDataUseCase } from './application/use-cases/get-heatmap-data.use-case'
import { GenerateHeatmapImageUseCase } from './application/use-cases/generate-heatmap-image.use-case'
import { GetHeatmapSummaryUseCase } from './application/use-cases/get-heatmap-summary.use-case'
import { HeatmapImageGeneratorService } from './application/services/heatmap-image-generator.service'

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HeatmapEventTypeormEntity,
      HeatmapImageTypeormEntity,
    ]),
  ],
  controllers: [HeatmapController],
  providers: [
    // Repositorios (con tokens de inyección)
    {
      provide: INJECTION_TOKENS.HEATMAP_EVENT_REPOSITORY,
      useClass: HeatmapEventRepositoryImpl,
    },
    {
      provide: INJECTION_TOKENS.HEATMAP_IMAGE_REPOSITORY,
      useClass: HeatmapImageRepositoryImpl,
    },
    // Use Cases
    CreateHeatmapEventUseCase,
    GetHeatmapDataUseCase,
    GenerateHeatmapImageUseCase,
    GetHeatmapSummaryUseCase,
    // ✅ Servicio de generación de imágenes (registrado correctamente)
    HeatmapImageGeneratorService,
  ],
  exports: [
    {
      provide: INJECTION_TOKENS.HEATMAP_EVENT_REPOSITORY,
      useClass: HeatmapEventRepositoryImpl,
    },
    {
      provide: INJECTION_TOKENS.HEATMAP_IMAGE_REPOSITORY,
      useClass: HeatmapImageRepositoryImpl,
    },
    HeatmapImageGeneratorService, // ✅ Exportar el servicio también
  ],
})
export class HeatmapModule {}