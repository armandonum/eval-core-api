
// application/use-cases/delete-cognitive-problem.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveProblemRepository } from '../../domain/interfaces/cognitive-problem.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class DeleteCognitiveProblemUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_PROBLEMS)
    private readonly repository: ICognitiveProblemRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const problem = await this.repository.findById(id);
    if (!problem) {
      throw new NotFoundException('Cognitive problem not found');
    }

    await this.repository.delete(id);
  }
}
