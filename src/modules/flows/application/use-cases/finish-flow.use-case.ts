import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { FlowRepository } from '../../domain/interfaces/flow.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FinishFlowUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FLOW_REPOSITORY)
    private readonly repository: FlowRepository,
  ) {}

  async execute(id: string) {
    const flow = await this.repository.findById(id);

    if (!flow) {
      throw new NotFoundException('Flow not found');
    }

    if (flow.status === 'finished') {
      throw new ConflictException('Flow is already finished');
    }

    flow.finish();

    return this.repository.update(flow);
  }
}