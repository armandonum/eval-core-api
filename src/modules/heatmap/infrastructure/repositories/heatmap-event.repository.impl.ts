// infrastructure/repositories/heatmap-event.repository.impl.ts

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Between, In } from 'typeorm'
import { HeatmapEvent } from '../../domain/entities/heatmap-event.entity'
import { HeatmapEventRepository } from '../../domain/interfaces/heatmap-event.repository.interface'
import { HeatmapEventTypeormEntity } from '../typeorm/heatmap-event.typeorm.entity'
import { HeatmapEventMapper } from '../typeorm/heatmap-event.mapper'

@Injectable()
export class HeatmapEventRepositoryImpl implements HeatmapEventRepository {
  constructor(
    @InjectRepository(HeatmapEventTypeormEntity)
    private readonly repository: Repository<HeatmapEventTypeormEntity>,
  ) {}

  async create(event: HeatmapEvent): Promise<HeatmapEvent> {
    const entity = HeatmapEventMapper.toPersistence(event)
    const saved = await this.repository.save(
      entity as HeatmapEventTypeormEntity,
    )
    return HeatmapEventMapper.toDomain(saved)
  }

  async findBySession(sessionId: string): Promise<HeatmapEvent[]> {
    const entities = await this.repository.find({
      where: { session_id: sessionId },
      order: { elapsed_ms_total: 'ASC' },
    })
    return HeatmapEventMapper.toDomainList(entities)
  }

  async findByProject(projectId: string): Promise<HeatmapEvent[]> {
    const entities = await this.repository.find({
      where: { project_id: projectId },
      order: { created_at: 'DESC' },
    })
    return HeatmapEventMapper.toDomainList(entities)
  }

  
  async getHeatmapData(params: {
  projectId: string
  nodeId?: string
  eventType: string
  sessionId?: string
  timeRangeStartMs?: number
  timeRangeEndMs?: number
  deviceType?: string
  binSize?: number // 🔥 NUEVO: tamaño de celda en % (ej. 2 = grilla de 2%)
}): Promise<{ xPct: number; yPct: number; intensity: number }[]> {
  const binSize = params.binSize ?? 2 // por defecto celdas de 2% x 2%

  const query = this.repository
    .createQueryBuilder('h')
    .select([
      // 🔥 Redondeamos la coordenada al bin más cercano en vez de usar el valor exacto
      `ROUND(h.x_pct / :binSize) * :binSize as "xPct"`,
      `ROUND(h.y_pct / :binSize) * :binSize as "yPct"`,
      'COUNT(*) as intensity',
    ])
    .setParameter('binSize', binSize)
    .where('h.project_id = :projectId', { projectId: params.projectId })
    .andWhere('h.event_type = :eventType', { eventType: params.eventType })

  if (params.sessionId) {
    query.andWhere('h.session_id = :sessionId', { sessionId: params.sessionId })
  }

  if (params.timeRangeStartMs !== undefined && params.timeRangeStartMs !== null) {
    query.andWhere('h.elapsed_ms_total >= :timeRangeStart', {
      timeRangeStart: params.timeRangeStartMs,
    })
  }

  if (params.timeRangeEndMs !== undefined && params.timeRangeEndMs !== null) {
    query.andWhere('h.elapsed_ms_total <= :timeRangeEnd', {
      timeRangeEnd: params.timeRangeEndMs,
    })
  }

  if (params.nodeId) {
    query.andWhere('h.node_id = :nodeId', { nodeId: params.nodeId })
  }

  if (params.deviceType) {
    query.andWhere('h.device_type = :deviceType', {
      deviceType: params.deviceType,
    })
  }

  query
    // 🔥 Agrupar por el bin, no por el valor exacto
    .groupBy('ROUND(h.x_pct / :binSize) * :binSize, ROUND(h.y_pct / :binSize) * :binSize')
    .orderBy('intensity', 'DESC')

  const results = await query.getRawMany()

  return results.map((r) => ({
    xPct: Number(r.xPct) || 0,
    yPct: Number(r.yPct) || 0,
    intensity: Number(r.intensity) || 0,
  }))
}


  async deleteBySession(sessionId: string): Promise<void> {
    await this.repository.delete({ session_id: sessionId })
  }
}