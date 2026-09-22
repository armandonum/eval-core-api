
import { SessionComment } from '../../domain/entities/session-comment.entity'
import { SessionCommentTypeormEntity } from './session-comment.typeorm.entity'

export class SessionCommentMapper {
  static toDomain(entity: SessionCommentTypeormEntity): SessionComment {
    return SessionComment.reconstitute({
      commentId: entity.comment_id,
      sessionId: entity.session_id,
      elapsedMsTotal: entity.elapsed_ms_total,
      text: entity.text,
      emotionLabel: entity.emotion_label,
      authorId: entity.author_id,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    })
  }

  static toPersistence(domain: SessionComment): Partial<SessionCommentTypeormEntity> {
    return {
      comment_id: domain.commentId,
      session_id: domain.sessionId,
      elapsed_ms_total: domain.elapsedMsTotal,
      text: domain.text,
      emotion_label: domain.emotionLabel,
      author_id: domain.authorId,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    }
  }

  static toDomainList(entities: SessionCommentTypeormEntity[]): SessionComment[] {
    return entities.map((entity) => this.toDomain(entity))
  }
}