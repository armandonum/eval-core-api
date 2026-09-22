// infrastructure/typeorm/heatmap-image.mapper.ts

import { HeatmapImage } from '../../domain/entities/heatmap-image.entity'
import { HeatmapImageTypeormEntity } from './heatmap-image.typeorm.entity'

export class HeatmapImageMapper {
  static toDomain(entity: HeatmapImageTypeormEntity): HeatmapImage {
    return HeatmapImage.reconstitute({
      heatmapImageId: entity.heatmap_image_id,
      projectId: entity.project_id,
      sessionId: entity.session_id,  // 🔥 NUEVO
      nodeId: entity.node_id,
      eventType: entity.event_type,
      timeRangeStartMs: entity.time_range_start_ms,  // 🔥 NUEVO
      timeRangeEndMs: entity.time_range_end_ms,      // 🔥 NUEVO
      deviceType: entity.device_type,
      minSessions: entity.min_sessions,
      imageData: entity.image_data,
      imageUrl: entity.image_url,
      generatedAt: entity.generated_at,
      generatedBy: entity.generated_by,
    })
  }

  static toPersistence(
    domain: HeatmapImage,
  ): Partial<HeatmapImageTypeormEntity> {
    return {
      heatmap_image_id: domain.heatmapImageId,
      project_id: domain.projectId,
      session_id: domain.sessionId,  // 🔥 NUEVO
      node_id: domain.nodeId,
      event_type: domain.eventType,
      time_range_start_ms: domain.timeRangeStartMs,  // 🔥 NUEVO
      time_range_end_ms: domain.timeRangeEndMs,      // 🔥 NUEVO
      device_type: domain.deviceType,
      min_sessions: domain.minSessions,
      image_data: domain.imageData,
      image_url: domain.imageUrl,
      generated_at: domain.generatedAt,
      generated_by: domain.generatedBy,
    }
  }

  static toDomainList(
    entities: HeatmapImageTypeormEntity[],
  ): HeatmapImage[] {
    return entities.map((entity) => this.toDomain(entity))
  }
}