import { Injectable } from '@nestjs/common';

import { CommentExpert } from '../../domain/entities/comment-expert.entity';
import { CommentExpertRepository } from '../../domain/interfaces/comment-expert.repository';

@Injectable()
export class FindCommentExpertsByProjectUseCase {
  constructor(
    private readonly repository: CommentExpertRepository,
  ) {}

  async execute(
    projectId: string,
  ): Promise<CommentExpert[]> {
    return this.repository.findByProjectId(
      projectId,
    );
  }
}