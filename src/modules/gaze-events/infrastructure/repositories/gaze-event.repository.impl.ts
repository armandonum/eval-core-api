import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import {
  GazeEventRepository,
  GazeHeatmapPoint,
} from '../../domain/interfaces/gaze-event.repository';
import { GazeEvent } from '../../domain/entities/gaze-event.entity';
import { GazeEventTypeorm } from '../typeorm/gaze-event.typeorm.entity';
import { GazeEventMapper } from '../typeorm/gaze-event.mapper';

@Injectable()
export class GazeEventRepositoryImpl implements GazeEventRepository {
  constructor(
    @InjectRepository(GazeEventTypeorm)
    private readonly repository: Repository<GazeEventTypeorm>,
  ) {}

  async create(event: GazeEvent): Promise<GazeEvent> {
    const typeorm = GazeEventMapper.toTypeorm(event);
    const saved = await this.repository.save(typeorm);
    return GazeEventMapper.toDomain(saved);
  }

  async createBatch(events: GazeEvent[]): Promise<number> {
    const typeorms = events.map(GazeEventMapper.toTypeorm);
    const saved = await this.repository.save(typeorms);
    return saved.length;
  }

  async findAll(): Promise<GazeEvent[]> {
    const events = await this.repository.find({
      order: { elapsed_ms_total: 'ASC' },
    });
    return events.map(GazeEventMapper.toDomain);
  }

  async findById(id: string): Promise<GazeEvent | null> {
    const event = await this.repository.findOne({ where: { event_id: id } });
    return event ? GazeEventMapper.toDomain(event) : null;
  }

  async findBySession(sessionId: string): Promise<GazeEvent[]> {
    const events = await this.repository.find({
      where: { session_id: sessionId },
      order: { elapsed_ms_total: 'ASC' },
    });
    return events.map(GazeEventMapper.toDomain);
  }

  async findBySessionAndTimeRange(
    sessionId: string,
    startMs: number,
    endMs: number,
  ): Promise<GazeEvent[]> {
    const events = await this.repository.find({
      where: {
        session_id: sessionId,
        elapsed_ms_total: Between(startMs, endMs),
      },
      order: { elapsed_ms_total: 'ASC' },
    });
    return events.map(GazeEventMapper.toDomain);
  }

  async findByNode(nodeId: string): Promise<GazeEvent[]> {
    const events = await this.repository.find({
      where: { node_id: nodeId },
      order: { elapsed_ms_total: 'ASC' },
    });
    return events.map(GazeEventMapper.toDomain);
  }

  async getHeatmapData(
    sessionId: string,
    startMs?: number,
    endMs?: number,
    nodeId?: string,
  ): Promise<GazeHeatmapPoint[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('gaze')
      .select('ROUND(gaze.gaze_x * 100, 1)', 'xPct')
      .addSelect('ROUND(gaze.gaze_y * 100, 1)', 'yPct')
      .addSelect('COUNT(*)', 'weight')
      .where('gaze.session_id = :sessionId', { sessionId })
      .groupBy('ROUND(gaze.gaze_x * 100, 1)')
      .addGroupBy('ROUND(gaze.gaze_y * 100, 1)')
      .orderBy('weight', 'DESC');

    if (startMs !== undefined) {
      queryBuilder.andWhere('gaze.elapsed_ms_total >= :startMs', { startMs });
    }
    if (endMs !== undefined) {
      queryBuilder.andWhere('gaze.elapsed_ms_total <= :endMs', { endMs });
    }
    if (nodeId) {
      queryBuilder.andWhere('gaze.node_id = :nodeId', { nodeId });
    }

    const results = await queryBuilder.getRawMany();

    return results.map((r) => ({
      xPct: Number(r.xPct),
      yPct: Number(r.yPct),
      weight: Number(r.weight),
    }));
  }

  async countBySession(sessionId: string): Promise<number> {
    return this.repository.count({ where: { session_id: sessionId } });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await this.repository.delete({ session_id: sessionId });
  }
}