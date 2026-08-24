
import { Injectable, Inject } from '@nestjs/common'
import { SessionComment } from '../../domain/entities/session-comment.entity'
import { SessionCommentRepository } from '../../domain/interfaces/session-comment.repository.interface'
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'

@Injectable()
export class FindSessionCommentsBySessionUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.SESSION_COMMENT_REPOSITORY)
    private readonly repository: SessionCommentRepository,
  ) {}

  async execute(sessionId: string): Promise<SessionComment[]> {
    return this.repository.findBySession(sessionId)
  }
}