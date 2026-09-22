import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { FlowClick } from '../../domain/entities/flow-click.entity';
import type { FlowClickRepository } from '../../domain/interfaces/flow-click.repository';

import { CreateFlowClickDto } from '../dtos/create-flow-click.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateFlowClickUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.FLOW_CLICK_REPOSITORY)
    private readonly repository: FlowClickRepository,
  ) {}

  async execute(
    dto: CreateFlowClickDto,
  ): Promise<FlowClick> {

    const click = new FlowClick(
      randomUUID(),
      dto.flowId,
      dto.orderIndex,
      dto.nodeId,
      dto.presentedNodeId ?? null,
      new Date(),
    );

    return this.repository.create(click);

  }

}