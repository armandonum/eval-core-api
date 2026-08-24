// domain/interfaces/cognitive-evaluator.repository.ts
import { CognitiveEvaluator } from '../entities/cognitive-evaluator.entity';
import { CognitiveEvaluatorRole } from '../enums/cognitive-evaluator-role.enum';

export interface ICognitiveEvaluatorRepository {
  create(evaluator: CognitiveEvaluator): Promise<CognitiveEvaluator>;
  update(evaluator: CognitiveEvaluator): Promise<CognitiveEvaluator>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<CognitiveEvaluator | null>;
  findAll(): Promise<CognitiveEvaluator[]>;
  findByEvaluation(evaluationId: string): Promise<CognitiveEvaluator[]>;
  findByUser(userId: string): Promise<CognitiveEvaluator[]>;
  findByEvaluationAndRole(evaluationId: string, role: CognitiveEvaluatorRole): Promise<CognitiveEvaluator[]>;
  findByUserAndEvaluation(userId: string, evaluationId: string): Promise<CognitiveEvaluator | null>;
  findByEvaluationAndStatus(evaluationId: string, completed: boolean): Promise<CognitiveEvaluator[]>;
  countByEvaluation(evaluationId: string): Promise<number>;
  countByEvaluationAndRole(evaluationId: string, role: CognitiveEvaluatorRole): Promise<number>;
  removeByEvaluation(evaluationId: string): Promise<void>;

    findAssignedEvaluationIds(userId: string): Promise<string[]>;

}

