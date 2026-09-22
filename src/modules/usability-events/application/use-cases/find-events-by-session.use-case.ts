import { Injectable, Inject } from '@nestjs/common';

import type { IUsabilityEventRepository } from '../../domain/interfaces/usability-event.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindEventsBySessionUseCase {

  constructor(
    @Inject(INJECTION_TOKENS.USABILITY_EVENTS_REPOSITORY)
    private readonly repository: IUsabilityEventRepository,
  ) {}

  async execute(sessionId: string) {
    return this.repository.findBySession(sessionId);
  }

}