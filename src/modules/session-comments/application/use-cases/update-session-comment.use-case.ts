
import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common'
import { UpdateSessionCommentDto } from '../dtos/update-session-comment.dto'
import { SessionCommentRepository } from '../../domain/interfaces/session-comment.repository.interface'
import { SessionComment } from '../../domain/entities/session-comment.entity'
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'

@Injectable()
export class UpdateSessionCommentUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.SESSION_COMMENT_REPOSITORY)
    private readonly repository: SessionCommentRepository,
  ) {}

  async execute(commentId: string, dto: UpdateSessionCommentDto): Promise<SessionComment> {
    const comment = await this.repository.findById(commentId)
    if (!comment) {
      throw new NotFoundException('Comentario no encontrado')
    }

    if (dto.text !== undefined) {
      comment.updateText(dto.text)
    }

    if (dto.emotionLabel !== undefined) {
      comment.updateMetadata( dto.emotionLabel)
    }

    return this.repository.update(comment)
  }
}