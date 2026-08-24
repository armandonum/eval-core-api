export class Flow {
  constructor(
    public readonly flowId: string,
    public readonly taskId: string,
    public readonly projectId: string,
    public name: string,
    public status: string,
    public readonly startedAt: Date,
    public finishedAt: Date | null,
  ) {}

  rename(name: string) {
    this.name = name;
  }

  finish() {
    this.status = 'finished';
    this.finishedAt = new Date();
  }
}