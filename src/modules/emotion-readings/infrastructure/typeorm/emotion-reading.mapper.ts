import { EmotionReadingEntity } from '../../domain/entities/emotion-reading.entity';
import { EmotionReadingTypeormEntity } from '../typeorm/emotion-reading.typeorm.entity';

export class EmotionReadingMapper {

  static toDomain(
    orm: EmotionReadingTypeormEntity,
  ): EmotionReadingEntity {

    return new EmotionReadingEntity(
      orm.reading_id,
      orm.session_id,
      Number(orm.elapsed_ms_total),
      orm.timestamp_real,
      orm.dominant_emotion,
      orm.scores_json,
      orm.created_at,
    );

  }

  static toOrm(
    domain: EmotionReadingEntity,
  ): EmotionReadingTypeormEntity {

    const orm = new EmotionReadingTypeormEntity();

    orm.reading_id = domain.readingId;
    orm.session_id = domain.sessionId;
    orm.elapsed_ms_total = domain.elapsedMsTotal;
    orm.timestamp_real = domain.timestampReal;
    orm.dominant_emotion = domain.dominantEmotion;
    orm.scores_json = domain.scoresJson;

    return orm;

  }

}