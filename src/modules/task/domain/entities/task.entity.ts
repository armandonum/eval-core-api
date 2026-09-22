export class Task {
  constructor(
    public readonly taskId: string,

    public readonly projectId: string,

    public title: string,

    public description: string,

    public requirementId: string,

    public orderIndex: number,

    public readonly createdAt: Date,
  ) {}

  update(
    title: string,
    description: string,
    orderIndex: number
  ) { 
    this.title = title;
    this.description = description;
  }
}