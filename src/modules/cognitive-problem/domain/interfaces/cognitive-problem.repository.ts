// domain/interfaces/cognitive-problem.repository.ts
import { CognitiveProblem } from '../entities/cognitive-problem.entity';
import { CognitiveProblemSeverity } from '../enums/cognitive-problem-severity.enum';
import { CognitiveProblemCategory } from '../enums/cognitive-problem-category.enum';
import { CognitiveProblemStatus } from '../enums/cognitive-problem-status.enum';

export interface ICognitiveProblemRepository {
  create(problem: CognitiveProblem): Promise<CognitiveProblem>;
  update(problem: CognitiveProblem): Promise<CognitiveProblem>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<CognitiveProblem | null>;
  findAll(): Promise<CognitiveProblem[]>;
  findByEvaluation(evaluationId: string): Promise<CognitiveProblem[]>;
  findBySeverity(severity: CognitiveProblemSeverity): Promise<CognitiveProblem[]>;
  findByCategory(category: CognitiveProblemCategory): Promise<CognitiveProblem[]>;
  findByStatus(status: CognitiveProblemStatus): Promise<CognitiveProblem[]>;
  findByEvaluationAndStatus(evaluationId: string, status: CognitiveProblemStatus): Promise<CognitiveProblem[]>;
  findByEvaluationAndSeverity(evaluationId: string, severity: CognitiveProblemSeverity): Promise<CognitiveProblem[]>;
  countByEvaluation(evaluationId: string): Promise<number>;
  countBySeverity(evaluationId: string): Promise<Record<CognitiveProblemSeverity, number>>;
  countByCategory(evaluationId: string): Promise<Record<CognitiveProblemCategory, number>>;
  countByStatus(evaluationId: string): Promise<Record<CognitiveProblemStatus, number>>;
  deleteByEvaluation(evaluationId: string): Promise<void>;
  findDuplicateProblems(evaluationId: string, title: string, description: string): Promise<CognitiveProblem[]>;
}
