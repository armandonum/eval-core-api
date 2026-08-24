import { Injectable } from '@nestjs/common';

import { CreateCommentExpertDto } from '../dtos/create-comment-expert.dto';

import { CommentExpert } from '../../domain/entities/comment-expert.entity';
import { CommentExpertRepository } from '../../domain/interfaces/comment-expert.repository';

@Injectable()
export class CreateCommentExpertUseCase {
  constructor(
    private readonly repository: CommentExpertRepository,
  ) {}

  async execute(
    dto: CreateCommentExpertDto,
  ): Promise<CommentExpert> {
    const now = new Date();

    const comment = new CommentExpert(
      '',
      dto.projectId,
      dto.sessionId ?? null,
      dto.taskId ?? null,
      dto.authorId ?? null,
      dto.commentType,
      dto.comment,
      dto.nodeId ?? null,
      dto.screenIdentifier ?? null,
      dto.severity ?? null,
      dto.elapsedMsTotal ?? 0,
      now,
      now,
    );

    return this.repository.create(comment);
  }
}