import { Injectable } from '@nestjs/common';

import { CommentExpertRepository } from '../../domain/interfaces/comment-expert.repository';

@Injectable()
export class DeleteCommentExpertUseCase {
  constructor(
    private readonly repository: CommentExpertRepository,
  ) {}

  async execute(commentId: string): Promise<void> {
    const comment =
      await this.repository.findById(commentId);

    if (!comment) {
      throw new Error(
        'Expert comment not found',
      );
    }

    await this.repository.delete(commentId);
  }
}