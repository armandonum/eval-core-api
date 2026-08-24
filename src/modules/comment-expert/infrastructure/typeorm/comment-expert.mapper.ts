import { CommentExpert } from '../../domain/entities/comment-expert.entity';
import { CommentExpertOrmEntity } from './comment-expert.orm-entity';

export class CommentExpertMapper {
  static toDomain(
    orm: CommentExpertOrmEntity,
  ): CommentExpert {
    return new CommentExpert(
      orm.commentId,
      orm.projectId,
      orm.sessionId,
      orm.taskId,
      orm.authorId,
      orm.commentType,
      orm.comment,
      orm.nodeId,
      orm.screenIdentifier,
      orm.severity,
      orm.elapsedMsTotal,
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toOrm(
    domain: CommentExpert,
  ): CommentExpertOrmEntity {
    const orm = new CommentExpertOrmEntity();

    /*
     * IMPORTANTE:
     *
     * No asignamos commentId cuando está vacío.
     * PostgreSQL debe utilizar:
     *
     * DEFAULT gen_random_uuid()
     */

    if (domain.commentId) {
      orm.commentId = domain.commentId;
    }

    orm.projectId = domain.projectId;
    orm.sessionId = domain.sessionId;
    orm.taskId = domain.taskId;
    orm.authorId = domain.authorId;
    orm.commentType = domain.commentType;
    orm.comment = domain.comment;
    orm.nodeId = domain.nodeId;
    orm.screenIdentifier = domain.screenIdentifier;
    orm.severity = domain.severity;
    orm.elapsedMsTotal = domain.elapsedMsTotal;

    if (domain.createdAt) {
      orm.createdAt = domain.createdAt;
    }

    if (domain.updatedAt) {
      orm.updatedAt = domain.updatedAt;
    }

    return orm;
  }
}