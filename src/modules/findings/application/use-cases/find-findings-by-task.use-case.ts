
// application/use-cases/find-findings-by-task.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { IFindingRepository } from '../../domain/interfaces/finding.repository';
import { Finding } from '../../domain/entities/finding.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindFindingsByTaskUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FINDING_REPOSITORY)
    private readonly repository: IFindingRepository,
  ) {}

  async execute(taskId: string): Promise<Finding[]> {
    return this.repository.findByTask(taskId);
  }
}