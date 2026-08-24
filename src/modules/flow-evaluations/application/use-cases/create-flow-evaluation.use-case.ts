import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateFlowEvaluationDto } from '../dtos/create-flow-evaluation.dto';

import { FlowEvaluation } from '../../domain/entities/flow-evaluation.entity';
import type { FlowEvaluationRepository } from '../../domain/interfaces/flow-evaluation.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateFlowEvaluationUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FLOW_EVALUATION_REPOSITORY)
    private readonly repository: FlowEvaluationRepository,
  ) {}

  async execute(dto: CreateFlowEvaluationDto) {

    const evaluation = new FlowEvaluation(
      randomUUID(),
      dto.sessionId,
      dto.flowId,
      dto.totalSteps,
      dto.completedSteps,
      dto.failures,
      dto.completed,
      dto.totalTimeMs,
      new Date(),
    );

    return this.repository.create(evaluation);
  }

}