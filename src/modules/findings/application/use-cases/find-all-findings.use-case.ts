
// application/use-cases/find-all-findings.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { IFindingRepository, FindFindingsOptions } from '../../domain/interfaces/finding.repository';
import { Finding } from '../../domain/entities/finding.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindAllFindingsUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FINDING_REPOSITORY)
    private readonly repository: IFindingRepository,
  ) {}

  async execute(options?: FindFindingsOptions): Promise<Finding[]> {
    return this.repository.findAll(options);
  }
}