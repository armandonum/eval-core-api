// application/use-cases/get-heatmap-data.use-case.ts

import { Injectable, Inject } from '@nestjs/common'
import { GetHeatmapDataDto } from '../dtos/heatmap-image.dto'
import { HeatmapEventRepository } from '../../domain/interfaces/heatmap-event.repository.interface'
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'

@Injectable()
export class GetHeatmapDataUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEATMAP_EVENT_REPOSITORY)
    private readonly repository: HeatmapEventRepository,
  ) {}

  async execute(dto: GetHeatmapDataDto) {
    return this.repository.getHeatmapData({
      projectId: dto.projectId,
      nodeId: dto.nodeId,
      eventType: dto.eventType,
      sessionId: dto.sessionId,
      timeRangeStartMs: dto.timeRangeStartMs,
      timeRangeEndMs: dto.timeRangeEndMs,
      deviceType: dto.deviceType,
    })
  }
}