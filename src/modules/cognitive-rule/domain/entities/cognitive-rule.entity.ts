// domain/entities/cognitive-rule.entity.ts
export class CognitiveRule {
  constructor(
    public readonly id: string,
    public readonly evaluationId: string,
    public ruleOrder: number,
    public description: string,
    public readonly createdAt: Date,
  ) {}

  // Métodos de dominio
  updateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('Rule description cannot be empty');
    }
    this.description = description.trim();
  }

  updateOrder(ruleOrder: number): void {
    if (ruleOrder < 1) {
      throw new Error('Rule order must be greater than 0');
    }
    this.ruleOrder = ruleOrder;
  }

  // Validaciones
  isValid(): boolean {
    return this.description.trim().length > 0;
  }

  isSameRule(description: string): boolean {
    return this.description.toLowerCase() === description.toLowerCase().trim();
  }
}