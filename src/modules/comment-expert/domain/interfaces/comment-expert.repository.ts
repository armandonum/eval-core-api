import { CommentExpert } from '../entities/comment-expert.entity';

export abstract class CommentExpertRepository {
  abstract create(
    comment: CommentExpert,
  ): Promise<CommentExpert>;

  abstract update(
    comment: CommentExpert,
  ): Promise<CommentExpert>;

  abstract delete(
    commentId: string,
  ): Promise<void>;

  abstract findById(
    commentId: string,
  ): Promise<CommentExpert | null>;

  abstract findAll(): Promise<CommentExpert[]>;

  abstract findByProjectId(
    projectId: string,
  ): Promise<CommentExpert[]>;

  abstract findBySessionId(
    sessionId: string,
  ): Promise<CommentExpert[]>;

  abstract findByTaskId(
    taskId: string,
  ): Promise<CommentExpert[]>;

  abstract findByAuthorId(
    authorId: string,
  ): Promise<CommentExpert[]>;
}