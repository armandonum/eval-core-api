// domain/interfaces/cognitive-dashboard.repository.ts
import { CognitiveDashboard } from '../entities/cognitive-dashboard.entity';

export interface IDashboardStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  failedTasks: number;
  pendingTasks: number;
  totalEvaluators: number;
  completedEvaluators: number;
  pendingEvaluators: number;
  totalResponses: number;
  completedResponses: number;
  pendingResponses: number;
  responsesWithIssues: number;
  averageTimeSeconds: number;
  successRate: number;
  q1Yes: number;
  q1No: number;
  q1Uncertain: number;
  q2Yes: number;
  q2No: number;
  q2Uncertain: number;
  q3Yes: number;
  q3No: number;
  q3Uncertain: number;
  q4Yes: number;
  q4No: number;
  q4Uncertain: number;
  progressPercentage: number;
}

export interface IEvaluatorProgress {
  evaluatorId: string;
  evaluatorName: string;
  progress: number;
  completed: boolean;
  tasksCompleted: number;
  totalTasks: number;
}

export interface IRecentResponse {
  id: string;
  taskTitle: string;
  evaluatorName: string;
  status: string;
  createdAt: Date;
  hasIssues: boolean;
}

export interface ICognitiveDashboardRepository {
  getDashboardStats(evaluationId: string): Promise<IDashboardStats>;
  getEvaluatorProgress(evaluationId: string): Promise<IEvaluatorProgress[]>;
  getRecentResponses(evaluationId: string, limit?: number): Promise<IRecentResponse[]>;
  saveDashboardSummary(dashboard: CognitiveDashboard): Promise<CognitiveDashboard>;
  getDashboardSummary(evaluationId: string): Promise<CognitiveDashboard | null>;
  getEvaluationName(evaluationId: string): Promise<string>;
}