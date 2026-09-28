import { GazeAoiMetric } from '../../domain/entities/gaze-aoi-metric.entity';
import { GazeAoiMetricTypeorm } from './gaze-aoi-metric.typeorm.entity';

export class GazeAoiMetricMapper {
  static toDomain(typeorm: GazeAoiMetricTypeorm): GazeAoiMetric {
    return new GazeAoiMetric(
      typeorm.metric_id,
      typeorm.session_id,
      typeorm.aoi_name,
      Number(typeorm.aoi_x1),
      Number(typeorm.aoi_y1),
      Number(typeorm.aoi_x2),
      Number(typeorm.aoi_y2),
      typeorm.time_to_first_fixation_ms,
      typeorm.fixation_count,
      typeorm.total_fixation_duration_ms,
      typeorm.fixations_before,
      Number(typeorm.percentage_fixated),
      typeorm.node_id,
      typeorm.calculated_at,
    );
  }

  static toTypeorm(domain: GazeAoiMetric): GazeAoiMetricTypeorm {
    const typeorm = new GazeAoiMetricTypeorm();
    if (domain.metricId) typeorm.metric_id = domain.metricId;
    typeorm.session_id = domain.sessionId;
    typeorm.aoi_name = domain.aoiName;
    typeorm.aoi_x1 = domain.aoiX1;
    typeorm.aoi_y1 = domain.aoiY1;
    typeorm.aoi_x2 = domain.aoiX2;
    typeorm.aoi_y2 = domain.aoiY2;
    typeorm.time_to_first_fixation_ms = domain.timeToFirstFixationMs;
    typeorm.fixation_count = domain.fixationCount;
    typeorm.total_fixation_duration_ms = domain.totalFixationDurationMs;
    typeorm.fixations_before = domain.fixationsBefore;
    typeorm.percentage_fixated = domain.percentageFixated;
    typeorm.node_id = domain.nodeId;
    typeorm.calculated_at = domain.calculatedAt;
    return typeorm;
  }
}