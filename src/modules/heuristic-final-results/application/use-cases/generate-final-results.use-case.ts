import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicFinalResultRepository,
  HEURISTIC_FINAL_RESULT_REPOSITORY,
} from '../../domain/interfaces/heuristic-final-result.repository';
import {
  HeuristicFinalResult,
  RankingItem,
  CriticalProblem,
  Recommendation,
} from '../../domain/entities/heuristic-final-result.entity';
import { GenerateFinalResultsDto } from '../dtos/generate-final-results.dto';
import { HEURISTIC_OBSERVATION_REPOSITORY } from '../../../heuristic-observations/domain/interfaces/heuristic-observation.repository';
import { HEURISTIC_POSITIVE_ASPECT_REPOSITORY } from '../../../heuristic-positive-aspects/domain/interfaces/heuristic-positive-aspect.repository';
import { HEURISTIC_RATING_REPOSITORY } from '../../../heuristic-ratings/domain/interfaces/heuristic-rating.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class GenerateFinalResultsUseCase {
  constructor(
    @Inject(HEURISTIC_FINAL_RESULT_REPOSITORY)
    private readonly finalResultRepository: HeuristicFinalResultRepository,
    @Inject(HEURISTIC_OBSERVATION_REPOSITORY)
    private readonly observationRepository: any,
    @Inject(HEURISTIC_POSITIVE_ASPECT_REPOSITORY)
    private readonly positiveAspectRepository: any,
    @Inject(HEURISTIC_RATING_REPOSITORY)
    private readonly ratingRepository: any,
    @Inject(INJECTION_TOKENS.HEURISTIC_PRINCIPLE_REPOSITORY)
    private readonly principleRepository: any,
  ) {}

  async execute(dto: GenerateFinalResultsDto): Promise<HeuristicFinalResult> {
    const { evaluationId } = dto;

    // 1. Obtener todas las observaciones
    const observations = await this.observationRepository.findByEvaluation(evaluationId);

    // 2. Obtener todos los aspectos positivos
    const positiveAspects = await this.positiveAspectRepository.findByEvaluation(evaluationId);

    // 3. Obtener todas las calificaciones
    const ratings = await this.ratingRepository.findByEvaluation(evaluationId);

    // 4. Calcular promedios por observación
    const ratingsByProblem = new Map<string, any[]>();
    for (const rating of ratings) {
      if (!ratingsByProblem.has(rating.problemId)) {
        ratingsByProblem.set(rating.problemId, []);
      }
      ratingsByProblem.get(rating.problemId)!.push(rating);
    }

    // 5. Construir ranking
    const rankingItems: RankingItem[] = [];
    const criticalProblems: CriticalProblem[] = [];
    const recommendations: Recommendation[] = [];

    let globalSeveritySum = 0;
    let globalFrequencySum = 0;
    let globalCriticalitySum = 0;
    let ratingCount = 0;

    for (const observation of observations) {
      const problemRatings = ratingsByProblem.get(observation.observationId) || [];

      let avgSeverity = observation.severity;
      let avgFrequency = 0;
      let avgCriticality = observation.severity;

      if (problemRatings.length > 0) {
        avgSeverity = problemRatings.reduce((s, r) => s + r.severity, 0) / problemRatings.length;
        avgFrequency = problemRatings.reduce((s, r) => s + r.frequency, 0) / problemRatings.length;
        avgCriticality = problemRatings.reduce((s, r) => s + r.criticality, 0) / problemRatings.length;

        globalSeveritySum += problemRatings.reduce((s, r) => s + r.severity, 0);
        globalFrequencySum += problemRatings.reduce((s, r) => s + r.frequency, 0);
        globalCriticalitySum += problemRatings.reduce((s, r) => s + r.criticality, 0);
        ratingCount += problemRatings.length;
      }

      // Obtener el principio asociado
      const principle = await this.principleRepository.findById(observation.principleId);

      rankingItems.push({
        principleId: observation.principleId,
        principleCode: principle?.code || '—',
        principleName: principle?.name || '—',
        problemDescription: observation.description,
        avgSeverity: parseFloat(avgSeverity.toFixed(1)),
        avgFrequency: parseFloat(avgFrequency.toFixed(1)),
        avgCriticality: parseFloat(avgCriticality.toFixed(1)),
        priorityRank: 0,
      });

      // Problemas críticos: criticidad alta (>= 12)
      if (avgCriticality >= 12) {
        criticalProblems.push({
          observationId: observation.observationId,
          principleCode: principle?.code || '—',
          description: observation.description,
          severity: avgSeverity,
          frequency: avgFrequency,
          criticality: avgCriticality,
          recommendation: observation.recommendation,
        });

        if (observation.recommendation) {
          recommendations.push({
            problemDescription: observation.description,
            recommendation: observation.recommendation,
            priority: avgCriticality >= 14 ? 'high' : 'medium',
          });
        }
      }
    }

    // 6. Ordenar ranking por criticidad descendente
    rankingItems.sort((a, b) => b.avgCriticality - a.avgCriticality);
    rankingItems.forEach((item, index) => {
      item.priorityRank = index + 1;
    });

    // 7. Ordenar problemas críticos
    criticalProblems.sort((a, b) => b.criticality - a.criticality);

    // 8. Calcular promedios globales
    const avgSeverity = ratingCount > 0 ? parseFloat((globalSeveritySum / ratingCount).toFixed(1)) : null;
    const avgFrequency = ratingCount > 0 ? parseFloat((globalFrequencySum / ratingCount).toFixed(1)) : null;
    const avgCriticality = ratingCount > 0 ? parseFloat((globalCriticalitySum / ratingCount).toFixed(1)) : null;

    // 9. Crear o actualizar resultado final
    const existing = await this.finalResultRepository.findByEvaluation(evaluationId);

    if (existing) {
      existing.update(
        observations.length,
        positiveAspects.length,
        dto.totalEvaluators ?? existing.totalEvaluators,
        dto.completedEvaluators ?? existing.completedEvaluators,
        rankingItems,
        criticalProblems,
        recommendations,
        avgSeverity,
        avgFrequency,
        avgCriticality,
      );
      return this.finalResultRepository.update(existing.resultId, existing);
    }

    const finalResult = HeuristicFinalResult.create(
      evaluationId,
      observations.length,
      positiveAspects.length,
      dto.totalEvaluators ?? 0,
      dto.completedEvaluators ?? 0,
      rankingItems,
      criticalProblems,
      recommendations,
      avgSeverity,
      avgFrequency,
      avgCriticality,
    );

    return this.finalResultRepository.create(finalResult);
  }
}