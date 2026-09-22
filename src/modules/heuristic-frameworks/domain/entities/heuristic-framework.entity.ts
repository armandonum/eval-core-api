export class HeuristicFramework {
  constructor(
    public readonly frameworkId: string,
    public name: string,
    public description: string | null,
    public author: string | null,
    public year: number | null,
    public isActive: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    name: string,
    description: string | null,
    author: string | null,
    year: number | null,
  ): HeuristicFramework {
    return new HeuristicFramework(
      null as any,
      name,
      description,
      author,
      year,
      true,
      new Date(),
      new Date(),
    );
  }

  update(
    name?: string,
    description?: string | null,
    author?: string | null,
    year?: number | null,
    isActive?: boolean,
  ): void {
    if (name !== undefined) this.name = name;
    if (description !== undefined) this.description = description;
    if (author !== undefined) this.author = author;
    if (year !== undefined) this.year = year;
    if (isActive !== undefined) this.isActive = isActive;
    this.updatedAt = new Date();
  }
}