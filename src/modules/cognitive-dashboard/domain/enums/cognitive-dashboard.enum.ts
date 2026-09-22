
// domain/enums/cognitive-dashboard.enum.ts
export enum CognitiveDashboardStatus {
  DRAFT = 'draft',
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export enum CognitiveResponseStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
}

export enum CognitiveTaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum CognitiveEvaluatorRole {
  SUPERVISOR = 'supervisor',
  EVALUATOR = 'evaluator',
  OBSERVER = 'observer',
}