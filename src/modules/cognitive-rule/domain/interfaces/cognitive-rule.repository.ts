// domain/interfaces/cognitive-rule.repository.ts
import { CognitiveRule } from '../entities/cognitive-rule.entity';

export interface ICognitiveRuleRepository {
  create(rule: CognitiveRule): Promise<CognitiveRule>;
  update(rule: CognitiveRule): Promise<CognitiveRule>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<CognitiveRule | null>;
  findAll(): Promise<CognitiveRule[]>;
  findByEvaluation(evaluationId: string): Promise<CognitiveRule[]>;
  findByEvaluationOrdered(evaluationId: string): Promise<CognitiveRule[]>;
  getMaxOrder(evaluationId: string): Promise<number>;
  reorderRules(evaluationId: string, ruleIds: string[]): Promise<void>;
  deleteByEvaluation(evaluationId: string): Promise<void>;
  countByEvaluation(evaluationId: string): Promise<number>;
  findDuplicateRule(evaluationId: string, description: string): Promise<CognitiveRule | null>;
}

