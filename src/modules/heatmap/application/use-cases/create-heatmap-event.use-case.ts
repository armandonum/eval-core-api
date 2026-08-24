// application/use-cases/create-heatmap-event.use-case.ts

import { Injectable, Inject } from '@nestjs/common'
import { CreateHeatmapEventDto } from '../dtos/create-heatmap-event.dto'
import { HeatmapEvent } from '../../domain/entities/heatmap-event.entity'
import { HeatmapEventRepository } from '../../domain/interfaces/heatmap-event.repository.interface'
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'

@Injectable()
export class CreateHeatmapEventUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEATMAP_EVENT_REPOSITORY)
    private readonly repository: HeatmapEventRepository,
  ) {}

  async execute(dto: CreateHeatmapEventDto): Promise<HeatmapEvent> {
    const event = HeatmapEvent.create({
      sessionId: dto.sessionId,
      projectId: dto.projectId,
      userId: dto.userId,
      eventType: dto.eventType,
      nodeId: dto.nodeId,
      screenIdentifier: dto.screenIdentifier,
      xPct: dto.xPct,
      yPct: dto.yPct,
      viewportWidth: dto.viewportWidth,
      viewportHeight: dto.viewportHeight,
      scrollDepth: dto.scrollDepth,
      elementSelector: dto.elementSelector,
      dwellMs: dto.dwellMs,
      elapsedMsTotal: dto.elapsedMsTotal,
      userAgent: dto.userAgent,
      deviceType: dto.deviceType,
      browser: dto.browser,
    })

    return this.repository.create(event)
  }
}