import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type { FlowClickRepository } from '../../domain/interfaces/flow-click.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindAllFlowClicksUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FLOW_CLICK_REPOSITORY)
    private readonly repository: FlowClickRepository,
  ) {}

  async execute() {
    return this.repository.findAll();
  }

}