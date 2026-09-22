export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export class HeuristicTask {
  constructor(
    public readonly id: string,
    public evaluationId: string,
    public projectTaskId: string | null,
    public title: string,
    public description: string | null,
    public userGoal: string | null,
    public orderIndex: number,
    public status: TaskStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    evaluationId: string,
    projectTaskId: string | null,
    title: string,
    description: string | null,
    userGoal: string | null,
    orderIndex: number,
  ): HeuristicTask {
    return new HeuristicTask(
      null as any,
      evaluationId,
      projectTaskId,
      title,
      description,
      userGoal,
      orderIndex,
      'pending',
      new Date(),
      new Date(),
    );
  }

  update(
    title?: string,
    description?: string | null,
    userGoal?: string | null,
    orderIndex?: number,
    status?: TaskStatus,
  ): void {
    if (title !== undefined) this.title = title;
    if (description !== undefined) this.description = description;
    if (userGoal !== undefined) this.userGoal = userGoal;
    if (orderIndex !== undefined) this.orderIndex = orderIndex;
    if (status !== undefined) this.status = status;
    this.updatedAt = new Date();
  }

  changeStatus(newStatus: TaskStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }
}