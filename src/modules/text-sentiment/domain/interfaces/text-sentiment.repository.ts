import { TextSentiment } from '../entities/text-sentiment.entity';

export abstract class TextSentimentRepository {
  abstract create(
    sentiment: TextSentiment,
  ): Promise<TextSentiment>;

  abstract update(
    sentiment: TextSentiment,
  ): Promise<TextSentiment>;

  abstract delete(
    sentimentId: string,
  ): Promise<void>;

  abstract findById(
    sentimentId: string,
  ): Promise<TextSentiment | null>;

  abstract findAll(): Promise<TextSentiment[]>;

  abstract findBySessionId(
    sessionId: string,
  ): Promise<TextSentiment[]>;

  abstract findByAuthorId(
    authorId: string,
  ): Promise<TextSentiment[]>;
}