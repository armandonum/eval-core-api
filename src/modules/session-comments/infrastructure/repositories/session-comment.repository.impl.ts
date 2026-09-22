
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SessionComment } from '../../domain/entities/session-comment.entity'
import { SessionCommentRepository } from '../../domain/interfaces/session-comment.repository.interface'
import { SessionCommentTypeormEntity } from '../typeorm/session-comment.typeorm.entity'
import { SessionCommentMapper } from '../typeorm/session-comment.mapper'

@Injectable()
export class SessionCommentRepositoryImpl implements SessionCommentRepository {
  constructor(
    @InjectRepository(SessionCommentTypeormEntity)
    private readonly repository: Repository<SessionCommentTypeormEntity>,
  ) {}

  async create(comment: SessionComment): Promise<SessionComment> {
    const entity = SessionCommentMapper.toPersistence(comment)
    const saved = await this.repository.save(entity as SessionCommentTypeormEntity)
    return SessionCommentMapper.toDomain(saved)
  }

  async update(comment: SessionComment): Promise<SessionComment> {
    const entity = SessionCommentMapper.toPersistence(comment)
    await this.repository.update(
      { comment_id: comment.commentId },
      entity as SessionCommentTypeormEntity,
    )
    const updated = await this.repository.findOne({
      where: { comment_id: comment.commentId },
    })
    if (!updated) {
      throw new Error('Error al actualizar el comentario')
    }
    return SessionCommentMapper.toDomain(updated)
  }

  async delete(commentId: string): Promise<void> {
    await this.repository.delete({ comment_id: commentId })
  }

  async findById(commentId: string): Promise<SessionComment | null> {
    const entity = await this.repository.findOne({
      where: { comment_id: commentId },
    })
    if (!entity) return null
    return SessionCommentMapper.toDomain(entity)
  }

  async findAll(): Promise<SessionComment[]> {
    const entities = await this.repository.find({
      order: { created_at: 'DESC' },
    })
    return SessionCommentMapper.toDomainList(entities)
  }

  async findBySession(sessionId: string): Promise<SessionComment[]> {
    const entities = await this.repository.find({
      where: { session_id: sessionId },
      order: { elapsed_ms_total: 'ASC' },
    })
    return SessionCommentMapper.toDomainList(entities)
  }
}