import { Inject, Injectable } from '@nestjs/common';
import {
  GazeEventRepository,
  GAZE_EVENT_REPOSITORY,
  GazeHeatmapPoint,
} from '../../domain/interfaces/gaze-event.repository';

export interface FindHeatmapDto {
  sessionId: string;
  startMs?: number;
  endMs?: number;
  nodeId?: string;
}

@Injectable()
export class FindGazeHeatmapDataUseCase {
  constructor(
    @Inject(GAZE_EVENT_REPOSITORY)
    private readonly repository: GazeEventRepository,
  ) {}

  async execute(dto: FindHeatmapDto): Promise<GazeHeatmapPoint[]> {
    return this.repository.getHeatmapData(
      dto.sessionId,
      dto.startMs,
      dto.endMs,
      dto.nodeId,
    );
  }
}