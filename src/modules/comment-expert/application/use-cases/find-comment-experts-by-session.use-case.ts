import { Injectable } from '@nestjs/common';

import { CommentExpert } from '../../domain/entities/comment-expert.entity';
import { CommentExpertRepository } from '../../domain/interfaces/comment-expert.repository';

@Injectable()
export class FindCommentExpertsBySessionUseCase {
  constructor(
    private readonly repository: CommentExpertRepository,
  ) {}

  async execute(
    sessionId: string,
  ): Promise<CommentExpert[]> {
    return this.repository.findBySessionId(
      sessionId,
    );
  }
}