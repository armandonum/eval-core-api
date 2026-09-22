export class FlowEvaluation {

  constructor(

    public readonly evaluationId: string,

    public readonly sessionId: string,

    public readonly flowId: string,

    public totalSteps: number,

    public completedSteps: number,

    public failures: number,

    public completed: boolean,

    public totalTimeMs: number,

    public readonly createdAt: Date,

  ) {}

  complete(
    completedSteps: number,
    failures: number,
    totalTimeMs: number,
  ) {

    this.completedSteps = completedSteps;

    this.failures = failures;

    this.totalTimeMs = totalTimeMs;

    this.completed = true;
  }

  fail(
    completedSteps: number,
    failures: number,
    totalTimeMs: number,
  ) {

    this.completedSteps = completedSteps;

    this.failures = failures;

    this.totalTimeMs = totalTimeMs;

    this.completed = false;
  }

}