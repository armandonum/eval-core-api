import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { FlowRepository } from '../../domain/interfaces/flow.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class DeleteFlowUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FLOW_REPOSITORY)
    private readonly repository: FlowRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<void> {
    const flow =
      await this.repository.findById(id);

    if (!flow) {
      throw new NotFoundException(
        'Flow not found',
      );
    }

    await this.repository.delete(id);
  }
}