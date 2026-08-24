import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateCommentExpertDto } from '../dtos/update-comment-expert.dto';

import { CommentExpertRepository } from '../../domain/interfaces/comment-expert.repository';

@Injectable()
export class UpdateCommentExpertUseCase {
  constructor(
    private readonly repository: CommentExpertRepository,
  ) {}

  async execute(
    commentId: string,
    dto: UpdateCommentExpertDto,
  ) {
    const comment =
      await this.repository.findById(commentId);

    if (!comment) {
      throw new NotFoundException(
        'Expert comment not found',
      );
    }

    comment.update(dto);

    return this.repository.update(comment);
  }
}