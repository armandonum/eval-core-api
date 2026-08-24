
// application/use-cases/update-cognitive-evaluation-status.use-case.ts
import { Injectable,Inject, NotFoundException } from '@nestjs/common';
import { ICognitiveEvaluationRepository } from '../../domain/interfaces/cognitive-evaluation.repository';
import { CognitiveEvaluationStatus } from '../../domain/enums/cognitive-evaluation-status.enum';
import { CognitiveEvaluation } from '../../domain/entities/cognitive-evaluation.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'

@Injectable()
export class UpdateCognitiveEvaluationStatusUseCase {
  constructor(    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)

    private readonly repository: ICognitiveEvaluationRepository,
  ) {}

  async execute(id: string, status: CognitiveEvaluationStatus): Promise<CognitiveEvaluation> {
    const evaluation = await this.repository.findById(id);
    if (!evaluation) {
      throw new NotFoundException('Cognitive evaluation not found');
    }

    // Usar métodos de dominio para cambiar estado
    switch (status) {
      case CognitiveEvaluationStatus.IN_PROGRESS:
        evaluation.start();
        break;
      case CognitiveEvaluationStatus.COMPLETED:
        evaluation.complete();
        break;
      case CognitiveEvaluationStatus.ARCHIVED:
        evaluation.archive();
        break;
      default:
        // Para DRAFT, PLANNING solo actualizar el estado
        evaluation.status = status;
        evaluation.updatedAt = new Date();
    }

    return this.repository.update(evaluation);
  }
}
