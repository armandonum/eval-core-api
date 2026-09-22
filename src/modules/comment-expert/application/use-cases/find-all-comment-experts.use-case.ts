import { Injectable } from '@nestjs/common';

import { CommentExpert } from '../../domain/entities/comment-expert.entity';
import { CommentExpertRepository } from '../../domain/interfaces/comment-expert.repository';

@Injectable()
export class FindAllCommentExpertsUseCase {
  constructor(
    private readonly repository: CommentExpertRepository,
  ) {}

  async execute(): Promise<CommentExpert[]> {
    return this.repository.findAll();
  }
}