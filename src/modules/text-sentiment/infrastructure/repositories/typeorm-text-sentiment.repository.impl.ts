import {
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import { TextSentimentRepository } from '../../domain/interfaces/text-sentiment.repository';
import { TextSentiment } from '../../domain/entities/text-sentiment.entity';

import { TextSentimentOrmEntity } from '../typeorm/text-sentiment.orm-entity';
import { TextSentimentMapper } from '../typeorm/text-sentiment.mapper';

@Injectable()
export class TypeOrmTextSentimentRepository
  implements TextSentimentRepository
{
  constructor(
    @InjectRepository(TextSentimentOrmEntity)
    private readonly repository: Repository<TextSentimentOrmEntity>,
  ) {}

  async create(
    sentiment: TextSentiment,
  ): Promise<TextSentiment> {
    const orm = TextSentimentMapper.toOrm(sentiment);

    const saved = await this.repository.save(orm);

    return TextSentimentMapper.toDomain(saved);
  }

  async update(
    sentiment: TextSentiment,
  ): Promise<TextSentiment> {
    const orm = TextSentimentMapper.toOrm(sentiment);

    const updated = await this.repository.save(orm);

    return TextSentimentMapper.toDomain(updated);
  }

  async delete(
    sentimentId: string,
  ): Promise<void> {
    await this.repository.delete({
      sentimentId,
    });
  }

  async findById(
    sentimentId: string,
  ): Promise<TextSentiment | null> {
    const sentiment = await this.repository.findOne({
      where: {
        sentimentId,
      },
    });

    if (!sentiment) {
      return null;
    }

    return TextSentimentMapper.toDomain(sentiment);
  }

  async findAll(): Promise<TextSentiment[]> {
    const sentiments =
      await this.repository.find({
        order: {
          timestampReal: 'DESC',
        },
      });

    return sentiments.map(
      TextSentimentMapper.toDomain,
    );
  }

  async findBySessionId(
    sessionId: string,
  ): Promise<TextSentiment[]> {
    const sentiments =
      await this.repository.find({
        where: {
          sessionId,
        },
        order: {
          elapsedMsTotal: 'ASC',
        },
      });

    return sentiments.map(
      TextSentimentMapper.toDomain,
    );
  }

  async findByAuthorId(
    authorId: string,
  ): Promise<TextSentiment[]> {
    const sentiments =
      await this.repository.find({
        where: {
          authorId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return sentiments.map(
      TextSentimentMapper.toDomain,
    );
  }
}