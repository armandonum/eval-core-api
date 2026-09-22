import {
  Injectable,Inject ,  NotFoundException,
} from '@nestjs/common';

import { UpdateUsabilitySessionDto } from '../dtos/update-usability-session.dto';
import type { UsabilitySessionRepository } from '../../domain/interfaces/usability-session.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class UpdateUsabilitySessionUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.USABILITY_SESSION_REPOSITORY)
    
    private readonly repository: UsabilitySessionRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateUsabilitySessionDto,
  ) {
    const session =
      await this.repository.findById(id);

    if (!session) {
      throw new NotFoundException(
        'Usability Session not found',
      );
    }

    Object.assign(session, dto);
    session.updatedAt = new Date();

    return this.repository.update(session);
  }
}