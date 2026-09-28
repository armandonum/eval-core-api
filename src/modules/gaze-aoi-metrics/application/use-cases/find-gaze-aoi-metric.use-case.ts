import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  GazeAoiMetricRepository,
  GAZE_AOI_METRIC_REPOSITORY,
} from '../../domain/interfaces/gaze-aoi-metric.repository';
import { GazeAoiMetric } from '../../domain/entities/gaze-aoi-metric.entity';

@Injectable()
export class FindGazeAoiMetricUseCase {
  constructor(
    @Inject(GAZE_AOI_METRIC_REPOSITORY)
    private readonly repository: GazeAoiMetricRepository,
  ) {}

  async execute(id: string): Promise<GazeAoiMetric> {
    const metric = await this.repository.findById(id);
    if (!metric) {
      throw new NotFoundException(`Métrica de AOI con ID ${id} no encontrada`);
    }
    return metric;
  }
}