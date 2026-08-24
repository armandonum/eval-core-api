import { TextSentiment } from '../../domain/entities/text-sentiment.entity';
import { TextSentimentOrmEntity } from './text-sentiment.orm-entity';

export class TextSentimentMapper {
  static toDomain(
    orm: TextSentimentOrmEntity,
  ): TextSentiment {
    return new TextSentiment(
      orm.sentimentId,
      orm.sessionId,
      orm.text,
      orm.originalLabel,
      orm.uxLabel,
      Number(orm.confidence),
      orm.scoresJson,
      orm.elapsedMsTotal,
      orm.timestampReal,
      orm.createdAt,
      orm.updatedAt,
      orm.authorId,
    );
  }

  static toOrm(
    domain: TextSentiment,
  ): TextSentimentOrmEntity {
    const orm = new TextSentimentOrmEntity();

    orm.sentimentId = domain.sentimentId;
    orm.sessionId = domain.sessionId;
    orm.text = domain.text;
    orm.originalLabel = domain.originalLabel;
    orm.uxLabel = domain.uxLabel;
    orm.confidence = domain.confidence;
    orm.scoresJson = domain.scoresJson;
    orm.elapsedMsTotal = domain.elapsedMsTotal;
    orm.timestampReal = domain.timestampReal;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.authorId = domain.authorId;

    return orm;
  }
}