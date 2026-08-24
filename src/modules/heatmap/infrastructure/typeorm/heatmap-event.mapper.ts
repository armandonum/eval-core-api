// infrastructure/typeorm/heatmap-event.mapper.ts

import { HeatmapEvent } from '../../domain/entities/heatmap-event.entity'
import { HeatmapEventTypeormEntity } from './heatmap-event.typeorm.entity'

export class HeatmapEventMapper {
  static toDomain(entity: HeatmapEventTypeormEntity): HeatmapEvent {
    return HeatmapEvent.reconstitute({
      eventId: entity.event_id,
      sessionId: entity.session_id,
      projectId: entity.project_id,
      userId: entity.user_id,
      eventType: entity.event_type as any,
      nodeId: entity.node_id,
      screenIdentifier: entity.screen_identifier,
      xPct: Number(entity.x_pct),
      yPct: Number(entity.y_pct),
      viewportWidth: entity.viewport_width,
      viewportHeight: entity.viewport_height,
      scrollDepth: entity.scroll_depth,
      elementSelector: entity.element_selector,
      dwellMs: entity.dwell_ms,
      elapsedMsTotal: entity.elapsed_ms_total,
      eventTime: entity.event_time,
      createdAt: entity.created_at,
      userAgent: entity.user_agent,
      deviceType: entity.device_type as any,
      browser: entity.browser,
    })
  }

  static toPersistence(
    domain: HeatmapEvent,
  ): Partial<HeatmapEventTypeormEntity> {
    return {
      event_id: domain.eventId,
      session_id: domain.sessionId,
      project_id: domain.projectId,
      user_id: domain.userId,
      event_type: domain.eventType,
      node_id: domain.nodeId,
      screen_identifier: domain.screenIdentifier,
      x_pct: domain.xPct,
      y_pct: domain.yPct,
      viewport_width: domain.viewportWidth,
      viewport_height: domain.viewportHeight,
      scroll_depth: domain.scrollDepth,
      element_selector: domain.elementSelector,
      dwell_ms: domain.dwellMs,
      elapsed_ms_total: domain.elapsedMsTotal,
      event_time: domain.eventTime,
      created_at: domain.createdAt,
      user_agent: domain.userAgent,
      device_type: domain.deviceType,
      browser: domain.browser,
    }
  }

  static toDomainList(
    entities: HeatmapEventTypeormEntity[],
  ): HeatmapEvent[] {
    return entities.map((entity) => this.toDomain(entity))
  }
}   