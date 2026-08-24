// infrastructure/mappers/usability-session.mapper.ts
import { UsabilitySession } from '../../domain/entities/usability-session.entity';
import { UsabilitySessionTypeormEntity } from '../typeorm/usability-session.typeorm.entity';

export class UsabilitySessionMapper {
  static toDomain(
    entity: UsabilitySessionTypeormEntity,
  ): UsabilitySession {
    return new UsabilitySession(
      entity.session_id,
      entity.project_id,
      entity.user_id,
      entity.task_id,
      entity.file_key,
      entity.node_id_inicial,
      entity.task_description,
      entity.started_at,
      entity.ended_at,
      entity.duration_seconds,
      entity.status,
      entity.device_type,
      entity.browser,
      entity.face_video_key ?? '',
      entity.screen_video_key ?? '',
      entity.created_at,
      entity.updated_at,
      entity.evaluation_type, // ✅ Ya está aquí
    );
  }

  static toPersistence(
    domain: UsabilitySession,
  ): UsabilitySessionTypeormEntity {
    const entity = new UsabilitySessionTypeormEntity();

    entity.session_id = domain.sessionId;
    entity.project_id = domain.proyectId;
    entity.user_id = domain.userId;
    entity.task_id = domain.taskId; // 🔥 FALTABA: task_id
    entity.file_key = domain.fileKey;
    entity.node_id_inicial = domain.nodeIdInicial;
    entity.task_description = domain.taskDescription;
    entity.started_at = domain.startedAt;
    entity.ended_at = domain.endedAt;
    entity.duration_seconds = domain.durationSeconds ?? 0;
    entity.status = domain.status;
    entity.device_type = domain.deviceType;
    entity.browser = domain.browser;
    entity.face_video_key = domain.faceVideoKey;
    entity.screen_video_key = domain.screenVideKey;
    
    entity.evaluation_type = domain.evaluationType || 'formal';

    return entity;
  }

  static toDomainList(
    entities: UsabilitySessionTypeormEntity[],
  ): UsabilitySession[] {
    return entities.map(this.toDomain);
  }
}