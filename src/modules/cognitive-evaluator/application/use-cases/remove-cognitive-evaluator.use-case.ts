
// application/use-cases/remove-cognitive-evaluator.use-case.ts
import { Injectable, NotFoundException, ForbiddenException, Inject } from '@nestjs/common';
import { ICognitiveEvaluatorRepository } from '../../domain/interfaces/cognitive-evaluator.repository';
import { ICognitiveEvaluationRepository } from '../../../cognitive-evaluation/domain/interfaces/cognitive-evaluation.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';


@Injectable()
export class RemoveCognitiveEvaluatorUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATOR)
    private readonly evaluatorRepository: ICognitiveEvaluatorRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly evaluationRepository: ICognitiveEvaluationRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const evaluator = await this.evaluatorRepository.findById(id);
    if (!evaluator) {
      throw new NotFoundException('Cognitive evaluator not found');
    }

    // Verificar que la evaluación no esté en progreso o completada
    const evaluation = await this.evaluationRepository.findById(evaluator.evaluationId);
    if (evaluation && evaluation.status !== 'draft' && evaluation.status !== 'planning') {
      throw new ForbiddenException(
        'Cannot remove evaluators from an evaluation that is in progress or completed',
      );
    }

    await this.evaluatorRepository.delete(id);
  }
}