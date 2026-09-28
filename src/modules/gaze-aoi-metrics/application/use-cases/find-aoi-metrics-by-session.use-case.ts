import { Inject, Injectable } from '@nestjs/common';
import {
  GazeAoiMetricRepository,
  GAZE_AOI_METRIC_REPOSITORY,
} from '../../domain/interfaces/gaze-aoi-metric.repository';
import { GazeAoiMetric } from '../../domain/entities/gaze-aoi-metric.entity';

@Injectable()
export class FindAoiMetricsBySessionUseCase {
  constructor(
    @Inject(GAZE_AOI_METRIC_REPOSITORY)
    private readonly repository: GazeAoiMetricRepository,
  ) {}

  async execute(sessionId: string): Promise<GazeAoiMetric[]> {
    return this.repository.findBySession(sessionId);
  }
}