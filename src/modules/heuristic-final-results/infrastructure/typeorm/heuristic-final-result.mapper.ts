import {
  HeuristicFinalResult,
  ResultStatus,
  RankingItem,
  CriticalProblem,
  Recommendation,
} from '../../domain/entities/heuristic-final-result.entity';
import { HeuristicFinalResultTypeorm } from './heuristic-final-result.typeorm.entity';

export class HeuristicFinalResultMapper {
  static toDomain(typeorm: HeuristicFinalResultTypeorm): HeuristicFinalResult {
    return new HeuristicFinalResult(
      typeorm.result_id,
      typeorm.evaluation_id,
      typeorm.total_problems,
      typeorm.total_positive_aspects,
      typeorm.total_evaluators,
      typeorm.completed_evaluators,
      typeorm.ranking_json as RankingItem[] | null,
      typeorm.critical_problems as CriticalProblem[] | null,
      typeorm.recommendations as Recommendation[] | null,
      typeorm.avg_severity ? Number(typeorm.avg_severity) : null,
      typeorm.avg_frequency ? Number(typeorm.avg_frequency) : null,
      typeorm.avg_criticality ? Number(typeorm.avg_criticality) : null,
      typeorm.status as ResultStatus,
      typeorm.calculated_at,
      typeorm.updated_at,
    );
  }

  static toTypeorm(domain: HeuristicFinalResult): HeuristicFinalResultTypeorm {
    const typeorm = new HeuristicFinalResultTypeorm();
    if (domain.resultId) typeorm.result_id = domain.resultId;
    typeorm.evaluation_id = domain.evaluationId;
    typeorm.total_problems = domain.totalProblems;
    typeorm.total_positive_aspects = domain.totalPositiveAspects;
    typeorm.total_evaluators = domain.totalEvaluators;
    typeorm.completed_evaluators = domain.completedEvaluators;
    typeorm.ranking_json = domain.rankingJson;
    typeorm.critical_problems = domain.criticalProblems;
    typeorm.recommendations = domain.recommendations;
    typeorm.avg_severity = domain.avgSeverity;
    typeorm.avg_frequency = domain.avgFrequency;
    typeorm.avg_criticality = domain.avgCriticality;
    typeorm.status = domain.status;
    typeorm.calculated_at = domain.calculatedAt;
    typeorm.updated_at = domain.updatedAt;
    return typeorm;
  }
}