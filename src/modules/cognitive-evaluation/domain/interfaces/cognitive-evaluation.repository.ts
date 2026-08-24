// domain/interfaces/cognitive-evaluation.repository.ts
import { CognitiveEvaluation } from '../entities/cognitive-evaluation.entity';
import { CognitiveEvaluationStatus } from '../enums/cognitive-evaluation-status.enum';

export interface ICognitiveEvaluationRepository {
  create(evaluation: CognitiveEvaluation): Promise<CognitiveEvaluation>;
  update(evaluation: CognitiveEvaluation): Promise<CognitiveEvaluation>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<CognitiveEvaluation | null>;
  findAll(): Promise<CognitiveEvaluation[]>;
  findByProject(projectId: string): Promise<CognitiveEvaluation[]>;
  findByStatus(status: CognitiveEvaluationStatus): Promise<CognitiveEvaluation[]>;
  findBySupervisor(supervisorId: string): Promise<CognitiveEvaluation[]>;
  findByUser(userId: string): Promise<CognitiveEvaluation[]>;

  updateStatus(id: string, status: CognitiveEvaluationStatus): Promise<CognitiveEvaluation>;
  countByProject(projectId: string): Promise<number>;
}
