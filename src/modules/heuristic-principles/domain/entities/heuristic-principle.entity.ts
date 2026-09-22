export class HeuristicPrinciple {
  constructor(
    public readonly principleId: string,
    public frameworkId: string,
    public code: string,
    public name: string,
    public description: string,
    public orderIndex: number,
    public isActive: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    frameworkId: string,
    code: string,
    name: string,
    description: string,
    orderIndex: number,
  ): HeuristicPrinciple {
    return new HeuristicPrinciple(
      null as any,
      frameworkId,
      code,
      name,
      description,
      orderIndex,
      true,
      new Date(),
      new Date(),
    );
  }

  update(
    code?: string,
    name?: string,
    description?: string,
    orderIndex?: number,
    isActive?: boolean,
  ): void {
    if (code !== undefined) this.code = code;
    if (name !== undefined) this.name = name;
    if (description !== undefined) this.description = description;
    if (orderIndex !== undefined) this.orderIndex = orderIndex;
    if (isActive !== undefined) this.isActive = isActive;
    this.updatedAt = new Date();
  }
}