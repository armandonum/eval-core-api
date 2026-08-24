import { Injectable, Inject } from '@nestjs/common';

import { UpdateUsabilityEventDto } from '../dtos/update-usability-event.dto';

import type{ IUsabilityEventRepository } from '../../domain/interfaces/usability-event.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class UpdateUsabilityEventUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.USABILITY_EVENTS_REPOSITORY)
    private readonly repository: IUsabilityEventRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateUsabilityEventDto,
  ) {

    return this.repository.update(id, {
      ...dto,
      timestamp_real: dto.timestamp_real
        ? new Date(dto.timestamp_real)
        : undefined,
    });

  }

}