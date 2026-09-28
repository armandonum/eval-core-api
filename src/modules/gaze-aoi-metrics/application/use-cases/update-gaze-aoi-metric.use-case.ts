import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  GazeAoiMetricRepository,
  GAZE_AOI_METRIC_REPOSITORY,
} from '../../domain/interfaces/gaze-aoi-metric.repository';
import { GazeAoiMetric } from '../../domain/entities/gaze-aoi-metric.entity';
import { UpdateGazeAoiMetricDto } from '../dtos/update-gaze-aoi-metric.dto';

@Injectable()
export class UpdateGazeAoiMetricUseCase {
  constructor(
    @Inject(GAZE_AOI_METRIC_REPOSITORY)
    private readonly repository: GazeAoiMetricRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateGazeAoiMetricDto,
  ): Promise<GazeAoiMetric> {
    const metric = await this.repository.findById(id);
    if (!metric) {
      throw new NotFoundException(`Métrica de AOI con ID ${id} no encontrada`);
    }

    // Actualizar campos
    const updated = {
      ...metric,
      timeToFirstFixationMs:
        dto.timeToFirstFixationMs ?? metric.timeToFirstFixationMs,
      fixationCount: dto.fixationCount ?? metric.fixationCount,
      totalFixationDurationMs:
        dto.totalFixationDurationMs ?? metric.totalFixationDurationMs,
      fixationsBefore: dto.fixationsBefore ?? metric.fixationsBefore,
      percentageFixated: dto.percentageFixated ?? metric.percentageFixated,
    };

    return this.repository.update(id, updated);
  }
}