import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateFlowEvaluationDto } from '../dtos/update-flow-evaluation.dto';

import type { FlowEvaluationRepository } from '../../domain/interfaces/flow-evaluation.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateFlowEvaluationUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FLOW_EVALUATION_REPOSITORY)
    private readonly repository: FlowEvaluationRepository,
  ) {}

  async execute(
    evaluationId: string,
    dto: UpdateFlowEvaluationDto,
  ) {

    const evaluation =
      await this.repository.findById(evaluationId);

    if (!evaluation) {
      throw new NotFoundException(
        'Flow Evaluation not found',
      );
    }

    Object.assign(evaluation, dto);

    return this.repository.update(evaluation);
  }

}