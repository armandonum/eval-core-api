import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicEvaluationRepository,
  
} from '../../domain/interfaces/heuristic-evaluation.repository';
import { HeuristicEvaluation } from '../../domain/entities/heuristic-evaluation.entity';
import { CreateHeuristicEvaluationDto } from '../dtos/create-heuristic-evaluation.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class CreateHeuristicEvaluationUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_EVALUATION_REPOSITORY)
    private readonly repository: HeuristicEvaluationRepository,
  ) {}

  async execute(dto: CreateHeuristicEvaluationDto): Promise<HeuristicEvaluation> {
    const evaluation = HeuristicEvaluation.create(
      dto.projectId,
      dto.frameworkId,
      dto.supervisorId,
      dto.name,
      dto.description ?? null,
      dto.systemDescription ?? null,
      dto.targetUserDescription ?? null,
      dto.maxDurationMinutes ?? 20,
    );

    return this.repository.create(evaluation);
  }
}