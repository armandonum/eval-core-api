import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { Flow } from '../../domain/entities/flow.entity';
import type { FlowRepository } from '../../domain/interfaces/flow.repository';

import { CreateFlowDto } from '../dtos/create-flow.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateFlowUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FLOW_REPOSITORY)
    private readonly repository: FlowRepository,
  ) {}

  async execute(dto: CreateFlowDto): Promise<Flow> {
    const flow = new Flow(
      randomUUID(),
      dto.taskId,
      dto.projectId,
      dto.name,
      'in_progress',
      new Date(),
      null,
    );

    return this.repository.create(flow);
  }
}