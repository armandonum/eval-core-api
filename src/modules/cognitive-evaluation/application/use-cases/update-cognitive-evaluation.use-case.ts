// application/use-cases/update-cognitive-evaluation.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICognitiveEvaluationRepository } from '../../domain/interfaces/cognitive-evaluation.repository';
import { UpdateCognitiveEvaluationDto } from '../dtos/update-cognitive-evaluation.dto';
import { CognitiveEvaluation } from '../../domain/entities/cognitive-evaluation.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'


@Injectable()
export class UpdateCognitiveEvaluationUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly repository: ICognitiveEvaluationRepository,
  ) {}

  async execute(id: string, dto: UpdateCognitiveEvaluationDto): Promise<CognitiveEvaluation> {
    const evaluation = await this.repository.findById(id);
    if (!evaluation) {
      throw new NotFoundException('Cognitive evaluation not found');
    }

    // Actualizar solo campos permitidos
    if (dto.name) evaluation.updateDetails(dto.name, dto.description || null);
    if (dto.maxDurationMinutes !== undefined || dto.targetUserDescription !== undefined || dto.systemDescription !== undefined) {
      evaluation.updateConfiguration(
        dto.maxDurationMinutes ?? evaluation.maxDurationMinutes,
        dto.targetUserDescription ?? evaluation.targetUserDescription,
        dto.systemDescription ?? evaluation.systemDescription,
      );
    }

    return this.repository.update(evaluation);
  }
}
