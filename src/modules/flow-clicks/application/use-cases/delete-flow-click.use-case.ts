import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { FlowClickRepository } from '../../domain/interfaces/flow-click.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class DeleteFlowClickUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FLOW_CLICK_REPOSITORY)
    private readonly repository: FlowClickRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<void> {

    const click =
      await this.repository.findById(id);

    if (!click) {
      throw new NotFoundException(
        'Flow Click not found',
      );
    }

    await this.repository.delete(id);

  }

}