// domain/interfaces/heatmap-image.repository.interface.ts

import { HeatmapImage } from '../entities/heatmap-image.entity'

export interface HeatmapImageRepository {
  create(image: HeatmapImage): Promise<HeatmapImage>
  findByProject(
    projectId: string,
    nodeId?: string,
  ): Promise<HeatmapImage[]>
  findOne(params: {
    projectId: string
    nodeId: string
    eventType: string
    sessionId?: string      // 🔥 NUEVO
    timeRangeStartMs?: number // 🔥 NUEVO
    timeRangeEndMs?: number   // 🔥 NUEVO
    deviceType?: string
  }): Promise<HeatmapImage | null>
  delete(heatmapImageId: string): Promise<void>
}