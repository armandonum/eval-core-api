import {
  Injectable,  Inject,
  NotFoundException,
} from '@nestjs/common';

import type { UsabilitySessionRepository } from '../../domain/interfaces/usability-session.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class DeleteUsabilitySessionUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.USABILITY_SESSION_REPOSITORY)
    private readonly repository: UsabilitySessionRepository,
  ) {}

  async execute(sessionId: string) {
    const session =
      await this.repository.findById(sessionId);

    if (!session) {
      throw new NotFoundException(
        'Usability Session not found',
      );
    }

    await this.repository.delete(sessionId);
  }
}