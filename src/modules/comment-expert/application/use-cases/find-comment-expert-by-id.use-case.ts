import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CommentExpert } from '../../domain/entities/comment-expert.entity';
import { CommentExpertRepository } from '../../domain/interfaces/comment-expert.repository';

@Injectable()
export class FindCommentExpertByIdUseCase {
  constructor(
    private readonly repository: CommentExpertRepository,
  ) {}

  async execute(
    commentId: string,
  ): Promise<CommentExpert> {
    const comment =
      await this.repository.findById(commentId);

    if (!comment) {
      throw new NotFoundException(
        'Expert comment not found',
      );
    }

    return comment;
  }
}