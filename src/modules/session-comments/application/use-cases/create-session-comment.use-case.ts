
import { Injectable, Inject, BadRequestException } from '@nestjs/common'
import { v4 as uuid } from 'uuid';
import { CreateSessionCommentDto } from '../dtos/create-session-comment.dto'
import { SessionComment } from '../../domain/entities/session-comment.entity'
import { SessionCommentRepository } from '../../domain/interfaces/session-comment.repository.interface'
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'

@Injectable()
export class CreateSessionCommentUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.SESSION_COMMENT_REPOSITORY)
    private readonly repository: SessionCommentRepository,
  ) {}

  async execute(dto: CreateSessionCommentDto): Promise<SessionComment> {
    if (!dto.text || dto.text.trim().length === 0) {
      throw new BadRequestException('El comentario no puede estar vacío')
    }

    const comment = SessionComment.create({
      commentId: uuid(),
      sessionId: dto.sessionId,
      elapsedMsTotal: dto.elapsedMsTotal,
      text: dto.text.trim(),
      emotionLabel: dto.emotionLabel ?? null,
      authorId: dto.authorId ?? null,
    })

    return this.repository.create(comment)
  }
}