// infrastructure/repositories/heatmap-image.repository.impl.ts

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { HeatmapImage } from '../../domain/entities/heatmap-image.entity'
import { HeatmapImageRepository } from '../../domain/interfaces/heatmap-image.repository.interface'
import { HeatmapImageTypeormEntity } from '../typeorm/heatmap-image.typeorm.entity'
import { HeatmapImageMapper } from '../typeorm/heatmap-image.mapper'

@Injectable()
export class HeatmapImageRepositoryImpl implements HeatmapImageRepository {
  constructor(
    @InjectRepository(HeatmapImageTypeormEntity)
    private readonly repository: Repository<HeatmapImageTypeormEntity>,
  ) {}

  async create(image: HeatmapImage): Promise<HeatmapImage> {
    const entity = HeatmapImageMapper.toPersistence(image)
    const saved = await this.repository.save(
      entity as HeatmapImageTypeormEntity,
    )
    return HeatmapImageMapper.toDomain(saved)
  }

  async findByProject(
    projectId: string,
    nodeId?: string,
  ): Promise<HeatmapImage[]> {
    const where: any = { project_id: projectId }
    if (nodeId) {
      where.node_id = nodeId
    }
    const entities = await this.repository.find({
      where,
      order: { generated_at: 'DESC' },
    })
    return HeatmapImageMapper.toDomainList(entities)
  }

  // 🔥 ACTUALIZADO con sessionId y timeRange
  async findOne(params: {
    projectId: string
    nodeId: string
    eventType: string
    sessionId?: string
    timeRangeStartMs?: number
    timeRangeEndMs?: number
    deviceType?: string
  }): Promise<HeatmapImage | null> {
    const where: any = {
      project_id: params.projectId,
      node_id: params.nodeId,
      event_type: params.eventType,
    }

    // 🔥 NUEVOS filtros
    if (params.sessionId) {
      where.session_id = params.sessionId
    }
    if (params.timeRangeStartMs !== undefined && params.timeRangeStartMs !== null) {
      where.time_range_start_ms = params.timeRangeStartMs
    }
    if (params.timeRangeEndMs !== undefined && params.timeRangeEndMs !== null) {
      where.time_range_end_ms = params.timeRangeEndMs
    }
    if (params.deviceType) {
      where.device_type = params.deviceType
    }

    const entity = await this.repository.findOne({ where })
    if (!entity) return null
    return HeatmapImageMapper.toDomain(entity)
  }

  async delete(heatmapImageId: string): Promise<void> {
    await this.repository.delete({ heatmap_image_id: heatmapImageId })
  }
}