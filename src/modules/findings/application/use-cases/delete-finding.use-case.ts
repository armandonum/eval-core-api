
// application/use-cases/delete-finding.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IFindingRepository } from '../../domain/interfaces/finding.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class DeleteFindingUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FINDING_REPOSITORY)
    private readonly repository: IFindingRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const finding = await this.repository.findById(id);
    if (!finding) {
      throw new NotFoundException('Finding not found');
    }

    await this.repository.delete(id);
  }
}
