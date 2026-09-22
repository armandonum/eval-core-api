import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentExpert } from '../../domain/entities/comment-expert.entity';
import { CommentExpertRepository } from '../../domain/interfaces/comment-expert.repository';

import { CommentExpertOrmEntity } from '../typeorm/comment-expert.orm-entity';
import { CommentExpertMapper } from '../typeorm/comment-expert.mapper';

@Injectable()
export class CommentExpertRepositoryImpl
  implements CommentExpertRepository
{
  constructor(
    @InjectRepository(CommentExpertOrmEntity)
    private readonly repository: Repository<CommentExpertOrmEntity>,
  ) {}

  async create(
    comment: CommentExpert,
  ): Promise<CommentExpert> {
    const ormEntity =
      CommentExpertMapper.toOrm(comment);

    const savedEntity =
      await this.repository.save(ormEntity);

    return CommentExpertMapper.toDomain(
      savedEntity,
    );
  }

  async update(
    comment: CommentExpert,
  ): Promise<CommentExpert> {
    const ormEntity =
      CommentExpertMapper.toOrm(comment);

    const savedEntity =
      await this.repository.save(ormEntity);

    return CommentExpertMapper.toDomain(
      savedEntity,
    );
  }

  async delete(
    commentId: string,
  ): Promise<void> {
    await this.repository.delete({
      commentId,
    });
  }

  async findById(
    commentId: string,
  ): Promise<CommentExpert | null> {
    const entity =
      await this.repository.findOne({
        where: {
          commentId,
        },
      });

    if (!entity) {
      return null;
    }

    return CommentExpertMapper.toDomain(
      entity,
    );
  }

  async findAll(): Promise<CommentExpert[]> {
    const entities =
      await this.repository.find({
        order: {
          createdAt: 'DESC',
        },
      });

    return entities.map(
      CommentExpertMapper.toDomain,
    );
  }

  async findByProjectId(
    projectId: string,
  ): Promise<CommentExpert[]> {
    const entities =
      await this.repository.find({
        where: {
          projectId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return entities.map(
      CommentExpertMapper.toDomain,
    );
  }

  async findBySessionId(
    sessionId: string,
  ): Promise<CommentExpert[]> {
    const entities =
      await this.repository.find({
        where: {
          sessionId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return entities.map(
      CommentExpertMapper.toDomain,
    );
  }

  async findByTaskId(
    taskId: string,
  ): Promise<CommentExpert[]> {
    const entities =
      await this.repository.find({
        where: {
          taskId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return entities.map(
      CommentExpertMapper.toDomain,
    );
  }

  async findByAuthorId(
    authorId: string,
  ): Promise<CommentExpert[]> {
    const entities =
      await this.repository.find({
        where: {
          authorId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return entities.map(
      CommentExpertMapper.toDomain,
    );
  }
}