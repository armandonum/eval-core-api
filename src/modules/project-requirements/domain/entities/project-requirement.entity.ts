export class ProjectRequirement {
  constructor(
    public readonly requirementId: string,
    public projectId: string,
    public createdBy: string | null,
    public code: string,
    public title: string,
    public description: string,
    public acceptanceCriteria: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  update(data: {
    code?: string
    title?: string
    description?: string
    acceptanceCriteria?: string | null
  }): void {
    if (data.code !== undefined) {
      this.code = data.code
    }

    if (data.title !== undefined) {
      this.title = data.title
    }

    if (data.description !== undefined) {
      this.description = data.description
    }

    if (data.acceptanceCriteria !== undefined) {
      this.acceptanceCriteria = data.acceptanceCriteria
    }

    this.updatedAt = new Date()
  }
}