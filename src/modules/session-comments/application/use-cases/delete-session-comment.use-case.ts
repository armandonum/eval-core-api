
import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { SessionCommentRepository } from '../../domain/interfaces/session-comment.repository.interface'
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'

@Injectable()
export class DeleteSessionCommentUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.SESSION_COMMENT_REPOSITORY)
    private readonly repository: SessionCommentRepository,
  ) {}

  async execute(commentId: string): Promise<void> {
    const comment = await this.repository.findById(commentId)
    if (!comment) {
      throw new NotFoundException('Comentario no encontrado')
    }

    await this.repository.delete(commentId)
  }
}