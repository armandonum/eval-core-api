// application/use-cases/delete-cognitive-evaluation.use-case.ts
import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ICognitiveEvaluationRepository } from '../../domain/interfaces/cognitive-evaluation.repository';
import { CognitiveEvaluationStatus } from '../../domain/enums/cognitive-evaluation-status.enum';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'


@Injectable()
export class DeleteCognitiveEvaluationUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly repository: ICognitiveEvaluationRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const evaluation = await this.repository.findById(id);
    if (!evaluation) {
      throw new NotFoundException('Cognitive evaluation not found');
    }

    // Solo se pueden eliminar evaluaciones en draft o planning
    if (evaluation.status !== CognitiveEvaluationStatus.DRAFT && 
        evaluation.status !== CognitiveEvaluationStatus.PLANNING) {
      throw new ForbiddenException(
        'Cannot delete an evaluation that is in progress or completed',
      );
    }

    await this.repository.delete(id);
  }
}
