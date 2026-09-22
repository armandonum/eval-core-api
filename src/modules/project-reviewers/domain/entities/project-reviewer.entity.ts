export class ProjectReviewer {
  constructor(
    public readonly projectReviewerId: string,

    public projectId: string,

    public userId: string,

    public roleId: number,

    public assignedAt: Date,

    public assignedBy: string | null,

  ) {}

  updateRole(
    roleId: number,
    assignedBy: string | null,
  ) {
    this.roleId = roleId;
    this.assignedBy = assignedBy;
  }

  reassign(
    userId: string,
    roleId: number,
    assignedBy: string | null,
  ) {
    this.userId = userId;
    this.roleId = roleId;
    this.assignedBy = assignedBy;
  }
}