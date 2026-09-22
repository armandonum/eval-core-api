import { Injectable, Inject } from '@nestjs/common';

import type { UsabilitySessionRepository } from '../../domain/interfaces/usability-session.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FindAllUsabilitySessionsUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.USABILITY_SESSION_REPOSITORY)
    private readonly repository: UsabilitySessionRepository,
  ) {}

  async execute() {
    return this.repository.findAll();
  }
}