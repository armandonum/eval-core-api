import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { FlowClickRepository } from '../../domain/interfaces/flow-click.repository';

import { UpdateFlowClickDto } from '../dtos/update-flow-click.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateFlowClickUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FLOW_CLICK_REPOSITORY)
    private readonly repository: FlowClickRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateFlowClickDto,
  ) {

    const click =
      await this.repository.findById(id);

    if (!click) {
      throw new NotFoundException(
        'Flow Click not found',
      );
    }

    click.update(
      dto.orderIndex ?? click.orderIndex,
      dto.nodeId ?? click.nodeId,
      dto.presentedNodeId ?? click.presentedNodeId,
    );

    return this.repository.update(click);

  }

}