import { Inject, Injectable, ConflictException } from '@nestjs/common';
import {
  GazeAoiMetricRepository,
  GAZE_AOI_METRIC_REPOSITORY,
} from '../../domain/interfaces/gaze-aoi-metric.repository';
import { GazeAoiMetric } from '../../domain/entities/gaze-aoi-metric.entity';
import { CreateGazeAoiMetricDto } from '../dtos/create-gaze-aoi-metric.dto';

@Injectable()
export class CreateGazeAoiMetricUseCase {
  constructor(
    @Inject(GAZE_AOI_METRIC_REPOSITORY)
    private readonly repository: GazeAoiMetricRepository,
  ) {}

  async execute(dto: CreateGazeAoiMetricDto): Promise<GazeAoiMetric> {
    // Verificar si ya existe
    const existing = await this.repository.findBySessionAndAoi(
      dto.sessionId,
      dto.aoiName,
    );

    if (existing) {
      throw new ConflictException(
        `Ya existe una métrica para el AOI "${dto.aoiName}" en esta sesión`,
      );
    }

    const metric = GazeAoiMetric.create(
      dto.sessionId,
      dto.aoiName,
      dto.aoiX1,
      dto.aoiY1,
      dto.aoiX2,
      dto.aoiY2,
      dto.timeToFirstFixationMs,
      dto.fixationCount,
      dto.totalFixationDurationMs,
      dto.fixationsBefore,
      dto.percentageFixated,
      dto.nodeId ?? null,
    );

    return this.repository.create(metric);
  }
}