// application/use-cases/create-cognitive-evaluation.use-case.ts
import { Injectable, ConflictException, Inject } from '@nestjs/common';

import { CognitiveEvaluation } from '../../domain/entities/cognitive-evaluation.entity';
import { CognitiveEvaluationStatus } from '../../domain/enums/cognitive-evaluation-status.enum';
import { ICognitiveEvaluationRepository } from '../../domain/interfaces/cognitive-evaluation.repository';
import { CreateCognitiveEvaluationDto } from '../dtos/create-cognitive-evaluation.dto';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens'


@Injectable()
export class CreateCognitiveEvaluationUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly repository: ICognitiveEvaluationRepository,
  ) {}

  async execute(dto: CreateCognitiveEvaluationDto): Promise<CognitiveEvaluation> {
    // Validar que no exista otra evaluación con el mismo nombre en el proyecto
    const existing = await this.repository.findByProject(dto.projectId);
    if (existing.some(e => e.name === dto.name)) {
      throw new ConflictException('An evaluation with this name already exists in the project');
    }

    const evaluation = new CognitiveEvaluation(
      crypto.randomUUID(),
      dto.projectId,
      dto.name,
      dto.description || null,
      dto.supervisorId,
      CognitiveEvaluationStatus.DRAFT,
      dto.maxDurationMinutes || 20,
      dto.targetUserDescription || null,
      dto.systemDescription || null,
      null,
      null,
      new Date(),
      new Date(),
    );

    return this.repository.create(evaluation);
  }
}
