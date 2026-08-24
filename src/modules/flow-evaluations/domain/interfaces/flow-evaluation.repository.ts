import { FlowEvaluation } from '../entities/flow-evaluation.entity';

export interface FlowEvaluationRepository {

  create(
    evaluation: FlowEvaluation,
  ): Promise<FlowEvaluation>;

  findById(
    evaluationId: string,
  ): Promise<FlowEvaluation | null>;

  findBySession(
    sessionId: string,
  ): Promise<FlowEvaluation | null>;

  findAll(): Promise<FlowEvaluation[]>;

  update(
    evaluation: FlowEvaluation,
  ): Promise<FlowEvaluation>;

  delete(
    evaluationId: string,
  ): Promise<void>;

}