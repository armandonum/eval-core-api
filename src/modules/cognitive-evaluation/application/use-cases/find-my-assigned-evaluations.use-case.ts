// cognitive-evaluation/application/use-cases/find-my-assigned-evaluations.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ICognitiveEvaluationRepository } from '../../domain/interfaces/cognitive-evaluation.repository';
import { ICognitiveEvaluatorRepository } from '../../../cognitive-evaluator/domain/interfaces/cognitive-evaluator.repository';
import { CognitiveEvaluation } from '../../domain/entities/cognitive-evaluation.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindMyAssignedEvaluationsUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly evaluationRepository: ICognitiveEvaluationRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATOR)
    private readonly evaluatorRepository: ICognitiveEvaluatorRepository,
  ) {}

  async execute(userId: string): Promise<CognitiveEvaluation[]> {
    // 1. Obtener IDs de evaluaciones donde el usuario está asignado
    const evaluationIds = await this.evaluatorRepository.findAssignedEvaluationIds(userId);
    
    if (evaluationIds.length === 0) {
      return [];
    }

    // 2. Obtener las evaluaciones completas
    const evaluations: CognitiveEvaluation[] = [];
    for (const id of evaluationIds) {
      const evaluation = await this.evaluationRepository.findById(id);
      if (evaluation) {
        // Solo mostrar evaluaciones que están activas (planning o in_progress)
        if (evaluation.status === 'draft' || evaluation.status === 'in_progress') {
          evaluations.push(evaluation);
        }
      }
    }

    return evaluations;
  }
}