import { UsabilityEvent } from '../../domain/entities/usability-event.entity';
import { UsabilityEventTypeormEntity } from '../typeorm/usability-event.typeorm.entity';

export class UsabilityEventMapper {

  static toDomain(
    entity: UsabilityEventTypeormEntity,
  ): UsabilityEvent {

    return new UsabilityEvent(
      entity.event_id,
      entity.session_id,
      entity.event_type,
      entity.event_type_normalizado,
      entity.node_id,
      entity.screen_name,
      entity.elapsed_minute,
      entity.elapsed_second,
      entity.elapsed_ms_total,
      entity.timestamp_real,
      entity.raw_payload,
    );

  }

  static toPersistence(
    domain: UsabilityEvent,
  ): UsabilityEventTypeormEntity {

    const entity = new UsabilityEventTypeormEntity();

    entity.event_id = domain.event_id;
    entity.session_id = domain.session_id;
    entity.event_type = domain.event_type;
    entity.event_type_normalizado = domain.event_type_normalizado;
    entity.node_id = domain.node_id;
    entity.screen_name = domain.screen_name;
    entity.elapsed_minute = domain.elapsed_minute;
    entity.elapsed_second = domain.elapsed_second;
    entity.elapsed_ms_total = domain.elapsed_ms_total;
    entity.timestamp_real = domain.timestamp_real;
    entity.raw_payload = domain.raw_payload;

    return entity;

  }

}