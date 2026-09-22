// domain/interfaces/cognitive-response.repository.ts
import { CognitiveResponse } from '../entities/cognitive-response.entity';
import { CognitiveResponseStatus } from '../enums/cognitive-response-status.enum';
import { CognitiveQuestionAnswer } from '../enums/cognitive-question-answer.enum';

export interface ICognitiveResponseRepository {
  create(response: CognitiveResponse): Promise<CognitiveResponse>;
  update(response: CognitiveResponse): Promise<CognitiveResponse>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<CognitiveResponse | null>;
  findAll(): Promise<CognitiveResponse[]>;
  findByEvaluation(evaluationId: string): Promise<CognitiveResponse[]>;
  findByEvaluator(evaluatorId: string): Promise<CognitiveResponse[]>;
  findByTask(taskId: string): Promise<CognitiveResponse[]>;
  findByAction(actionId: string): Promise<CognitiveResponse[]>;
  findByEvaluationAndEvaluator(evaluationId: string, evaluatorId: string): Promise<CognitiveResponse[]>;
  findByTaskAndEvaluator(taskId: string, evaluatorId: string): Promise<CognitiveResponse | null>;
  findByEvaluationAndStatus(evaluationId: string, status: CognitiveResponseStatus): Promise<CognitiveResponse[]>;
  countByEvaluation(evaluationId: string): Promise<number>;
  countByEvaluator(evaluatorId: string): Promise<number>;
  countByTask(taskId: string): Promise<number>;
  getStatsByEvaluation(evaluationId: string): Promise<ResponseStats>;
  getIssuesByEvaluation(evaluationId: string): Promise<IssueSummary[]>;
  deleteByEvaluation(evaluationId: string): Promise<void>;
  deleteByTask(taskId: string): Promise<void>;
}



export interface ResponseStats {
  total: number;
  completed: number;
  pending: number;
  skipped: number;
  withIssues: number;
  averageTimeSeconds: number;
  successRate: number;
  questionStats: {
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
  };
}

export interface IssueSummary {
  taskId: string;
  taskTitle: string;
  issueCount: number;
  q1Issues: number;
  q2Issues: number;
  q3Issues: number;
  q4Issues: number;
  problems: string[];
}