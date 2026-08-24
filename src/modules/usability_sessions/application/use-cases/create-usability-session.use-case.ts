import { Injectable,Inject } from '@nestjs/common';

import { CreateUsabilitySessionDto } from '../dtos/create-usability-session.dto';
import { UsabilitySession } from '../../domain/entities/usability-session.entity';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';
import type { UsabilitySessionRepository } from '../../domain/interfaces/usability-session.repository';

@Injectable()
export class CreateUsabilitySessionUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.USABILITY_SESSION_REPOSITORY)
    private readonly repository: UsabilitySessionRepository,
  ) {}

  async execute(
    dto: CreateUsabilitySessionDto,
  ): Promise<UsabilitySession> {

    const session = new UsabilitySession(
       crypto.randomUUID(),
      dto.proyectId,
      dto.userId ?? null,
      dto.taskId,
      dto.fileKey,
      dto.nodeIdInicial ?? null,
      dto.taskDescription,
      new Date(),
      null,
      null,
      'in_progress',
      dto.deviceType,
      dto.browser,
      '',
      '',
      new Date(),
      new Date(),
      dto.evaluationType,
      
    );
    
            console.log("la session se madnad lo sigueint :" , dto)


    return this.repository.create(session);
  }
}