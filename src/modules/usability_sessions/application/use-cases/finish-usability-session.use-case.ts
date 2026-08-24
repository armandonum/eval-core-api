import {
  Injectable, Inject,
  NotFoundException,
} from '@nestjs/common';

import { FinishUsabilitySessionDto } from '../dtos/finish-usability-session.dto';
import { SessionStatusEnum } from '../../domain/value-objects/session-status.vo';
import type { UsabilitySessionRepository } from '../../domain/interfaces/usability-session.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class FinishUsabilitySessionUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.USABILITY_SESSION_REPOSITORY)
  
    private readonly repository: UsabilitySessionRepository,
  ) {}

  async execute(
    sessionId: string,
    dto: FinishUsabilitySessionDto,
  ) {
    const session = await this.repository.findById(sessionId);

    if (!session) {
      throw new NotFoundException('Usability Session not found');
    }

    const serverEndDate = new Date();

    if (dto.status === SessionStatusEnum.ABANDONED) {
      session.abandon(serverEndDate);
    } else {
      session.finish(serverEndDate, dto.faceVideoKey, dto.screenVideKey);
    }

    return this.repository.update(session);
  }
}