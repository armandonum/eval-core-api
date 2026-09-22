export type ResultStatus = 'pending' | 'completed' | 'reviewed';

export interface RankingItem {
  principleId: string;
  principleCode: string;
  principleName: string;
  problemDescription: string;
  avgSeverity: number;
  avgFrequency: number;
  avgCriticality: number;
  priorityRank: number;
}

export interface CriticalProblem {
  observationId: string;
  principleCode: string;
  description: string;
  severity: number;
  frequency: number;
  criticality: number;
  recommendation: string | null;
}

export interface Recommendation {
  problemDescription: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

export class HeuristicFinalResult {
  constructor(
    public readonly resultId: string,
    public evaluationId: string,
    public totalProblems: number,
    public totalPositiveAspects: number,
    public totalEvaluators: number,
    public completedEvaluators: number,
    public rankingJson: RankingItem[] | null,
    public criticalProblems: CriticalProblem[] | null,
    public recommendations: Recommendation[] | null,
    public avgSeverity: number | null,
    public avgFrequency: number | null,
    public avgCriticality: number | null,
    public status: ResultStatus,
    public readonly calculatedAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    evaluationId: string,
    totalProblems: number,
    totalPositiveAspects: number,
    totalEvaluators: number,
    completedEvaluators: number,
    rankingJson: RankingItem[] | null,
    criticalProblems: CriticalProblem[] | null,
    recommendations: Recommendation[] | null,
    avgSeverity: number | null,
    avgFrequency: number | null,
    avgCriticality: number | null,
  ): HeuristicFinalResult {
    return new HeuristicFinalResult(
      null as any,
      evaluationId,
      totalProblems,
      totalPositiveAspects,
      totalEvaluators,
      completedEvaluators,
      rankingJson,
      criticalProblems,
      recommendations,
      avgSeverity,
      avgFrequency,
      avgCriticality,
      'pending',
      new Date(),
      new Date(),
    );
  }

  update(
    totalProblems?: number,
    totalPositiveAspects?: number,
    totalEvaluators?: number,
    completedEvaluators?: number,
    rankingJson?: RankingItem[] | null,
    criticalProblems?: CriticalProblem[] | null,
    recommendations?: Recommendation[] | null,
    avgSeverity?: number | null,
    avgFrequency?: number | null,
    avgCriticality?: number | null,
  ): void {
    if (totalProblems !== undefined) this.totalProblems = totalProblems;
    if (totalPositiveAspects !== undefined) this.totalPositiveAspects = totalPositiveAspects;
    if (totalEvaluators !== undefined) this.totalEvaluators = totalEvaluators;
    if (completedEvaluators !== undefined) this.completedEvaluators = completedEvaluators;
    if (rankingJson !== undefined) this.rankingJson = rankingJson;
    if (criticalProblems !== undefined) this.criticalProblems = criticalProblems;
    if (recommendations !== undefined) this.recommendations = recommendations;
    if (avgSeverity !== undefined) this.avgSeverity = avgSeverity;
    if (avgFrequency !== undefined) this.avgFrequency = avgFrequency;
    if (avgCriticality !== undefined) this.avgCriticality = avgCriticality;
    this.updatedAt = new Date();
  }

  changeStatus(newStatus: ResultStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }
}