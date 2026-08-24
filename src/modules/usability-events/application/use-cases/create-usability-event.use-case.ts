import { Injectable, Inject  } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateUsabilityEventDto } from '../dtos/create-usability-event.dto';

import { UsabilityEvent } from '../../domain/entities/usability-event.entity';
import type { IUsabilityEventRepository } from '../../domain/interfaces/usability-event.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class CreateUsabilityEventUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.USABILITY_EVENTS_REPOSITORY)
    private readonly repository: IUsabilityEventRepository,
  ) {}

  async execute(
    dto: CreateUsabilityEventDto,
  ): Promise<UsabilityEvent> {

    const event = new UsabilityEvent(
      uuid(),
      dto.session_id,
      dto.event_type,
      dto.event_type_normalizado,
      dto.node_id ?? null,
      dto.screen_name ?? null,
      dto.elapsed_minute,
      dto.elapsed_second,
      dto.elapsed_ms_total,
      new Date(dto.timestamp_real),
      dto.raw_payload ?? null,
    );

    return this.repository.create(event);

  }

}