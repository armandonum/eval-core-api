import { Inject, Injectable } from '@nestjs/common';

import type { FlowRepository } from '../../domain/interfaces/flow.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindAllFlowsUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FLOW_REPOSITORY)
    private readonly repository: FlowRepository,
  ) {}

  async execute() {
    return this.repository.findAll();
  }
}