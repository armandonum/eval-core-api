export type ExpertCommentType =
  | 'observation'
  | 'problem'
  | 'recommendation'
  | 'positive'
  | 'question';

export class CommentExpert {
  constructor(
    public readonly commentId: string,
    public projectId: string,
    public sessionId: string | null,
    public taskId: string | null,
    public authorId: string | null,
    public commentType: ExpertCommentType,
    public comment: string,
    public nodeId: string | null,
    public screenIdentifier: string | null,
    public severity: number | null,
    public elapsedMsTotal: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  update(data: {
    projectId?: string;
    sessionId?: string | null;
    taskId?: string | null;
    authorId?: string | null;
    commentType?: ExpertCommentType;
    comment?: string;
    nodeId?: string | null;
    screenIdentifier?: string | null;
    severity?: number | null;
    elapsedMsTotal?: number;
  }): void {
    if (data.projectId !== undefined) {
      this.projectId = data.projectId;
    }

    if (data.sessionId !== undefined) {
      this.sessionId = data.sessionId;
    }

    if (data.taskId !== undefined) {
      this.taskId = data.taskId;
    }

    if (data.authorId !== undefined) {
      this.authorId = data.authorId;
    }

    if (data.commentType !== undefined) {
      this.commentType = data.commentType;
    }

    if (data.comment !== undefined) {
      this.comment = data.comment;
    }

    if (data.nodeId !== undefined) {
      this.nodeId = data.nodeId;
    }

    if (data.screenIdentifier !== undefined) {
      this.screenIdentifier = data.screenIdentifier;
    }

    if (data.severity !== undefined) {
      this.severity = data.severity;
    }

    if (data.elapsedMsTotal !== undefined) {
      this.elapsedMsTotal = data.elapsedMsTotal;
    }

    this.updatedAt = new Date();
  }
}