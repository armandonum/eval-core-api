import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { FlowClickRepository } from '../../domain/interfaces/flow-click.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindFlowClickUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FLOW_CLICK_REPOSITORY)
    private readonly repository: FlowClickRepository,
  ) {}

  async execute(id: string) {

    const click =
      await this.repository.findById(id);

    if (!click) {
      throw new NotFoundException(
        'Flow Click not found',
      );
    }

    return click;

  }

}