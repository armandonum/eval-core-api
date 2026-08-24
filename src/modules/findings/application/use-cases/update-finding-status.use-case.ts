
// application/use-cases/update-finding-status.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IFindingRepository } from '../../domain/interfaces/finding.repository';
import { FindingStatus } from '../../domain/enums/finding-status.enum';
import { Finding } from '../../domain/entities/finding.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class UpdateFindingStatusUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FINDING_REPOSITORY)
    private readonly repository: IFindingRepository,
  ) {}

  async execute(id: string, status: FindingStatus): Promise<Finding> {
    const finding = await this.repository.findById(id);
    if (!finding) {
      throw new NotFoundException('Finding not found');
    }

    finding.updateStatus(status);
    return this.repository.update(finding);
  }
}