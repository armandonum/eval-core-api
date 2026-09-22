import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type { FlowEvaluationRepository } from '../../domain/interfaces/flow-evaluation.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindAllFlowEvaluationsUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FLOW_EVALUATION_REPOSITORY)
    private readonly repository: FlowEvaluationRepository,
  ) {}

  async execute() {
    return this.repository.findAll();
  }

}