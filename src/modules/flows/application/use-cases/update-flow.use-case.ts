import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { FlowRepository } from '../../domain/interfaces/flow.repository';

import { UpdateFlowDto } from '../dtos/update-flow.dto';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateFlowUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FLOW_REPOSITORY)
    private readonly repository: FlowRepository,
  ) {}

  async execute(id: string, dto: UpdateFlowDto) {
    const flow = await this.repository.findById(id);

    if (!flow) {
      throw new NotFoundException('Flow not found');
    }

    if (dto.name !== undefined) {
      flow.rename(dto.name);
    }

    return this.repository.update(flow);
  }
}