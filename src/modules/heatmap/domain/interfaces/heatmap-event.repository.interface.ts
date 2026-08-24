// domain/interfaces/heatmap-event.repository.interface.ts

import { HeatmapEvent } from '../entities/heatmap-event.entity'

export interface HeatmapEventRepository {
  create(event: HeatmapEvent): Promise<HeatmapEvent>
  findBySession(sessionId: string): Promise<HeatmapEvent[]>
  findByProject(projectId: string): Promise<HeatmapEvent[]>
  getHeatmapData(params: {
    projectId: string
    nodeId?: string
    eventType: string
    sessionId?: string        // 🔥 NUEVO
    timeRangeStartMs?: number // 🔥 NUEVO
    timeRangeEndMs?: number   // 🔥 NUEVO
    startDate?: Date
    endDate?: Date
    deviceType?: string
  }): Promise<{ xPct: number; yPct: number; intensity: number }[]>
  deleteBySession(sessionId: string): Promise<void>
}