// src/modules/heatmap/application/use-cases/generate-heatmap-image.use-case.ts

import { Injectable, Inject } from '@nestjs/common'
import { GenerateHeatmapImageDto } from '../dtos/heatmap-image.dto'
import { HeatmapImage } from '../../domain/entities/heatmap-image.entity'
import { HeatmapImageRepository } from '../../domain/interfaces/heatmap-image.repository.interface'
import { HeatmapEventRepository } from '../../domain/interfaces/heatmap-event.repository.interface'
import { HeatmapImageGeneratorService } from '../services/heatmap-image-generator.service'
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'

@Injectable()
export class GenerateHeatmapImageUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEATMAP_IMAGE_REPOSITORY)
    private readonly imageRepository: HeatmapImageRepository,
    @Inject(INJECTION_TOKENS.HEATMAP_EVENT_REPOSITORY)
    private readonly eventRepository: HeatmapEventRepository,
    private readonly imageGenerator: HeatmapImageGeneratorService, // ✅ Inyectado correctamente
  ) {}

 async execute(dto: GenerateHeatmapImageDto): Promise<HeatmapImage> {
  // 1. Buscar imagen existente
  const existing = await this.imageRepository.findOne({
    projectId: dto.projectId,
    nodeId: dto.nodeId,
    eventType: dto.eventType,
    deviceType: dto.deviceType,
    sessionId: dto.sessionId,
    timeRangeStartMs: dto.timeRangeStartMs,
    timeRangeEndMs: dto.timeRangeEndMs,
  });

  if (existing) {
    return existing;
  }

  // 2. Obtener datos con filtros
  const data = await this.eventRepository.getHeatmapData({
    projectId: dto.projectId,
    nodeId: dto.nodeId,
    eventType: dto.eventType,
    sessionId: dto.sessionId,           // 🔥 Nuevo
    timeRangeStartMs: dto.timeRangeStartMs, // 🔥 Nuevo
    timeRangeEndMs: dto.timeRangeEndMs,     // 🔥 Nuevo
    deviceType: dto.deviceType,
  });

  // 3. Generar imagen
  const imageData = this.imageGenerator.generateHeatmapImage(data);

  // 4. Guardar con todos los metadatos
  const heatmapImage = HeatmapImage.create({
    projectId: dto.projectId,
    nodeId: dto.nodeId,
    eventType: dto.eventType,
    sessionId: dto.sessionId,              // 🔥 Nuevo
    timeRangeStartMs: dto.timeRangeStartMs, // 🔥 Nuevo
    timeRangeEndMs: dto.timeRangeEndMs,     // 🔥 Nuevo
    deviceType: dto.deviceType,
    minSessions: dto.minSessions || 1,
    imageData: imageData,
    generatedBy: null,
  });

  return this.imageRepository.create(heatmapImage);
}

}