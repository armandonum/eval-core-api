
// application/use-cases/get-finding-summary.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IFindingRepository } from '../../domain/interfaces/finding.repository';
import { FindingSummary } from '../../domain/interfaces/finding.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class GetFindingSummaryUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FINDING_REPOSITORY)
    private readonly repository: IFindingRepository,
  ) {}

  async execute(evaluationId: string): Promise<FindingSummary> {
    return this.repository.getSummary(evaluationId);
  }
}