// domain/entities/cognitive-action.entity.ts
export class CognitiveAction {
  constructor(
    public readonly id: string,
    public readonly taskId: string,
    public stepOrder: number,
    public actionDescription: string,
    public expectedOutcome: string | null,
    public uiElement: string | null,
    public selectorPath: string | null,
    public successCriteria: string | null,
    public readonly createdAt: Date,
  ) {}

  // Métodos de dominio
  updateDetails(
    actionDescription: string,
    expectedOutcome: string | null,
    uiElement: string | null,
    selectorPath: string | null,
    successCriteria: string | null,
  ): void {
    this.actionDescription = actionDescription;
    this.expectedOutcome = expectedOutcome;
    this.uiElement = uiElement;
    this.selectorPath = selectorPath;
    this.successCriteria = successCriteria;
  }

  updateOrder(stepOrder: number): void {
    this.stepOrder = stepOrder;
  }

  // Validaciones
  isValid(): boolean {
    return this.actionDescription.trim().length > 0;
  }

  hasSelector(): boolean {
    return this.selectorPath !== null && this.selectorPath.trim().length > 0;
  }

  hasExpectedOutcome(): boolean {
    return this.expectedOutcome !== null && this.expectedOutcome.trim().length > 0;
  }
}