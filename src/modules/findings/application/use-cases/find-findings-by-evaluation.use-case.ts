
// application/use-cases/find-findings-by-evaluation.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { IFindingRepository, FindFindingsOptions } from '../../domain/interfaces/finding.repository';
import { Finding } from '../../domain/entities/finding.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindFindingsByEvaluationUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FINDING_REPOSITORY)
    private readonly repository: IFindingRepository,
  ) {}

  async execute(evaluationId: string, options?: Omit<FindFindingsOptions, 'evaluationId'>): Promise<Finding[]> {
    return this.repository.findAll({
      ...options,
      evaluationId,
    });
  }
}