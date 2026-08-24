
// application/use-cases/find-findings-by-session.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { IFindingRepository } from '../../domain/interfaces/finding.repository';
import { Finding } from '../../domain/entities/finding.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindFindingsBySessionUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FINDING_REPOSITORY)
    private readonly repository: IFindingRepository,
  ) {}

  async execute(sessionId: string): Promise<Finding[]> {
    return this.repository.findBySession(sessionId);
  }
}
