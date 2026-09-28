import { GazeEvent, GazeEventType } from '../../domain/entities/gaze-event.entity';
import { GazeEventTypeorm } from './gaze-event.typeorm.entity';

export class GazeEventMapper {
  static toDomain(typeorm: GazeEventTypeorm): GazeEvent {
    return new GazeEvent(
      typeorm.event_id,
      typeorm.session_id,
      Number(typeorm.elapsed_ms_total),
      typeorm.timestamp_real,
      Number(typeorm.gaze_x),
      Number(typeorm.gaze_y),
      Number(typeorm.confidence),
      typeorm.viewport_width,
      typeorm.viewport_height,
      typeorm.node_id,
      typeorm.event_type as GazeEventType,
      typeorm.duration_ms,
      typeorm.created_at,
    );
  }

  static toTypeorm(domain: GazeEvent): GazeEventTypeorm {
    const typeorm = new GazeEventTypeorm();
    if (domain.eventId) typeorm.event_id = domain.eventId;
    typeorm.session_id = domain.sessionId;
    typeorm.elapsed_ms_total = domain.elapsedMsTotal;
    typeorm.timestamp_real = domain.timestampReal;
    typeorm.gaze_x = domain.gazeX;
    typeorm.gaze_y = domain.gazeY;
    typeorm.confidence = domain.confidence;
    typeorm.viewport_width = domain.viewportWidth;
    typeorm.viewport_height = domain.viewportHeight;
    typeorm.node_id = domain.nodeId;
    typeorm.event_type = domain.eventType;
    typeorm.duration_ms = domain.durationMs;
    typeorm.created_at = domain.createdAt;
    return typeorm;
  }
}