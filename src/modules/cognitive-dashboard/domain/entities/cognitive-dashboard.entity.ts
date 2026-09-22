// domain/entities/cognitive-dashboard.entity.ts
import { CognitiveDashboardStatus } from '../enums/cognitive-dashboard.enum';

export class CognitiveDashboard {
  constructor(
    public readonly summaryId: string,
    public readonly evaluationId: string,
    public totalTasks: number,
    public completedTasks: number,
    public inProgressTasks: number,
    public failedTasks: number,
    public pendingTasks: number,
    public totalEvaluators: number,
    public completedEvaluators: number,
    public pendingEvaluators: number,
    public totalResponses: number,
    public completedResponses: number,
    public pendingResponses: number,
    public responsesWithIssues: number,
    public averageTimeSeconds: number,
    public successRate: number,
    public q1Yes: number,
    public q1No: number,
    public q1Uncertain: number,
    public q2Yes: number,
    public q2No: number,
    public q2Uncertain: number,
    public q3Yes: number,
    public q3No: number,
    public q3Uncertain: number,
    public q4Yes: number,
    public q4No: number,
    public q4Uncertain: number,
    public progressPercentage: number,
    public calculatedAt: Date,
    public updatedAt: Date,
  ) {}

  updateProgress(totalTasks: number, completedTasks: number): void {
    this.totalTasks = totalTasks;
    this.completedTasks = completedTasks;
    this.progressPercentage = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;
    this.updatedAt = new Date();
  }

  updateQuestionStats(
    q1Yes: number, q1No: number, q1Uncertain: number,
    q2Yes: number, q2No: number, q2Uncertain: number,
    q3Yes: number, q3No: number, q3Uncertain: number,
    q4Yes: number, q4No: number, q4Uncertain: number,
  ): void {
    this.q1Yes = q1Yes;
    this.q1No = q1No;
    this.q1Uncertain = q1Uncertain;
    this.q2Yes = q2Yes;
    this.q2No = q2No;
    this.q2Uncertain = q2Uncertain;
    this.q3Yes = q3Yes;
    this.q3No = q3No;
    this.q3Uncertain = q3Uncertain;
    this.q4Yes = q4Yes;
    this.q4No = q4No;
    this.q4Uncertain = q4Uncertain;
    this.updatedAt = new Date();
  }
}
