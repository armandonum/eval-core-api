
import { SessionComment } from '../entities/session-comment.entity'

export interface SessionCommentRepository {
  create(comment: SessionComment): Promise<SessionComment>
  update(comment: SessionComment): Promise<SessionComment>
  delete(commentId: string): Promise<void>
  findById(commentId: string): Promise<SessionComment | null>
  findAll(): Promise<SessionComment[]>
  findBySession(sessionId: string): Promise<SessionComment[]>
}