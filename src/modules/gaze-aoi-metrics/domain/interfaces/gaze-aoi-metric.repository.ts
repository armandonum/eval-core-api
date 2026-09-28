import { GazeAoiMetric } from '../entities/gaze-aoi-metric.entity';

export interface GazeAoiMetricRepository {
  create(metric: GazeAoiMetric): Promise<GazeAoiMetric>;
  createBatch(metrics: GazeAoiMetric[]): Promise<GazeAoiMetric[]>;
  findAll(): Promise<GazeAoiMetric[]>;
  findById(id: string): Promise<GazeAoiMetric | null>;
  findBySession(sessionId: string): Promise<GazeAoiMetric[]>;
  findBySessionAndAoi(
    sessionId: string,
    aoiName: string,
  ): Promise<GazeAoiMetric | null>;
  findByAoiName(aoiName: string): Promise<GazeAoiMetric[]>;
  findByNode(nodeId: string): Promise<GazeAoiMetric[]>;
  update(id: string, metric: Partial<GazeAoiMetric>): Promise<GazeAoiMetric>;
  upsert(metric: GazeAoiMetric): Promise<GazeAoiMetric>;
  delete(id: string): Promise<void>;
  deleteBySession(sessionId: string): Promise<void>;
  countBySession(sessionId: string): Promise<number>;
}

export const GAZE_AOI_METRIC_REPOSITORY = 'GAZE_AOI_METRIC_REPOSITORY';