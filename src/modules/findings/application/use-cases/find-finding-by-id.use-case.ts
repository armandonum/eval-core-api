
// application/use-cases/find-finding-by-id.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IFindingRepository } from '../../domain/interfaces/finding.repository';
import { Finding } from '../../domain/entities/finding.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindFindingByIdUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FINDING_REPOSITORY)
    private readonly repository: IFindingRepository,
  ) {}

  async execute(id: string): Promise<Finding> {
    const finding = await this.repository.findById(id);
    if (!finding) {
      throw new NotFoundException('Finding not found');
    }
    return finding;
  }
}
