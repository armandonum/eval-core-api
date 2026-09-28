import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GazeAoiMetricRepository } from '../../domain/interfaces/gaze-aoi-metric.repository';
import { GazeAoiMetric } from '../../domain/entities/gaze-aoi-metric.entity';
import { GazeAoiMetricTypeorm } from '../typeorm/gaze-aoi-metric.typeorm.entity';
import { GazeAoiMetricMapper } from '../typeorm/gaze-aoi-metric.mapper';

@Injectable()
export class GazeAoiMetricRepositoryImpl implements GazeAoiMetricRepository {
  constructor(
    @InjectRepository(GazeAoiMetricTypeorm)
    private readonly repository: Repository<GazeAoiMetricTypeorm>,
  ) {}

  async create(metric: GazeAoiMetric): Promise<GazeAoiMetric> {
    const typeorm = GazeAoiMetricMapper.toTypeorm(metric);
    const saved = await this.repository.save(typeorm);
    return GazeAoiMetricMapper.toDomain(saved);
  }

  async createBatch(metrics: GazeAoiMetric[]): Promise<GazeAoiMetric[]> {
    const typeorms = metrics.map(GazeAoiMetricMapper.toTypeorm);
    const saved = await this.repository.save(typeorms);
    return saved.map(GazeAoiMetricMapper.toDomain);
  }

  async findAll(): Promise<GazeAoiMetric[]> {
    const metrics = await this.repository.find({
      order: { calculated_at: 'DESC' },
    });
    return metrics.map(GazeAoiMetricMapper.toDomain);
  }

  async findById(id: string): Promise<GazeAoiMetric | null> {
    const metric = await this.repository.findOne({
      where: { metric_id: id },
    });
    return metric ? GazeAoiMetricMapper.toDomain(metric) : null;
  }

  async findBySession(sessionId: string): Promise<GazeAoiMetric[]> {
    const metrics = await this.repository.find({
      where: { session_id: sessionId },
      order: { aoi_name: 'ASC' },
    });
    return metrics.map(GazeAoiMetricMapper.toDomain);
  }

  async findBySessionAndAoi(
    sessionId: string,
    aoiName: string,
  ): Promise<GazeAoiMetric | null> {
    const metric = await this.repository.findOne({
      where: { session_id: sessionId, aoi_name: aoiName },
    });
    return metric ? GazeAoiMetricMapper.toDomain(metric) : null;
  }

  async findByAoiName(aoiName: string): Promise<GazeAoiMetric[]> {
    const metrics = await this.repository.find({
      where: { aoi_name: aoiName },
      order: { calculated_at: 'DESC' },
    });
    return metrics.map(GazeAoiMetricMapper.toDomain);
  }

  async findByNode(nodeId: string): Promise<GazeAoiMetric[]> {
    const metrics = await this.repository.find({
      where: { node_id: nodeId },
      order: { calculated_at: 'DESC' },
    });
    return metrics.map(GazeAoiMetricMapper.toDomain);
  }

  async update(
    id: string,
    metric: Partial<GazeAoiMetric>,
  ): Promise<GazeAoiMetric> {
    await this.repository.update(id, {
      time_to_first_fixation_ms: metric.timeToFirstFixationMs,
      fixation_count: metric.fixationCount,
      total_fixation_duration_ms: metric.totalFixationDurationMs,
      fixations_before: metric.fixationsBefore,
      percentage_fixated: metric.percentageFixated,
      calculated_at: new Date(),
    });
    const updated = await this.repository.findOne({
      where: { metric_id: id },
    });
    return GazeAoiMetricMapper.toDomain(updated!);
  }

  async upsert(metric: GazeAoiMetric): Promise<GazeAoiMetric> {
    const existing = await this.findBySessionAndAoi(
      metric.sessionId,
      metric.aoiName,
    );
    if (existing) {
      return this.update(existing.metricId, metric);
    }
    return this.create(metric);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await this.repository.delete({ session_id: sessionId });
  }

  async countBySession(sessionId: string): Promise<number> {
    return this.repository.count({ where: { session_id: sessionId } });
  }
}