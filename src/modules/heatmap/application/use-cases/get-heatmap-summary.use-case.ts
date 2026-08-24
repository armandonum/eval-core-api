// application/use-cases/get-heatmap-summary.use-case.ts

import { Injectable, Inject } from '@nestjs/common'
import { HeatmapEventRepository } from '../../domain/interfaces/heatmap-event.repository.interface'
import { HeatmapEvent } from '../../domain/entities/heatmap-event.entity'
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'

@Injectable()
export class GetHeatmapSummaryUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEATMAP_EVENT_REPOSITORY)
    private readonly repository: HeatmapEventRepository,
  ) {}

  async execute(projectId: string) {
    const events = await this.repository.findByProject(projectId)

    const totalClicks = events.filter(e => e.eventType === 'click').length
    const totalMoves = events.filter(e => e.eventType === 'move').length
    const totalScrolls = events.filter(e => e.eventType === 'scroll').length
    const uniqueSessions = new Set(events.map(e => e.sessionId)).size

    // Calcular zonas más calientes
    const clicksByNode: Record<string, number> = {}
    events
      .filter(e => e.eventType === 'click' && e.nodeId)
      .forEach(e => {
        const key = e.nodeId!
        clicksByNode[key] = (clicksByNode[key] || 0) + 1
      })

    const topNodes = Object.entries(clicksByNode)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([nodeId, count]) => ({ nodeId, clicks: count }))

    return {
      totalEvents: events.length,
      totalClicks,
      totalMoves,
      totalScrolls,
      uniqueSessions,
      topNodes,
      averageClicksPerSession: uniqueSessions > 0 ? totalClicks / uniqueSessions : 0,
      deviceDistribution: this.getDeviceDistribution(events),
      eventTypeDistribution: {
        click: totalClicks,
        move: totalMoves,
        scroll: totalScrolls,
        dwell: events.filter(e => e.eventType === 'dwell').length,
        resize: events.filter(e => e.eventType === 'resize').length,
      },
    }
  }

  private getDeviceDistribution(events: HeatmapEvent[]): Record<string, number> {
    const distribution: Record<string, number> = {}
    events.forEach(e => {
      const device = e.deviceType || 'unknown'
      distribution[device] = (distribution[device] || 0) + 1
    })
    return distribution
  }
}