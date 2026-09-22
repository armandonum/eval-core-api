import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { FlowEvaluationRepository } from '../../domain/interfaces/flow-evaluation.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindFlowEvaluationUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FLOW_EVALUATION_REPOSITORY)
    private readonly repository: FlowEvaluationRepository,
  ) {}

  async execute(
    evaluationId: string,
  ) {

    const evaluation =
      await this.repository.findById(evaluationId);

    if (!evaluation) {
      throw new NotFoundException(
        'Flow Evaluation not found',
      );
    }

    return evaluation;
  }

}