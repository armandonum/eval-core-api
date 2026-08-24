
// application/use-cases/find-cognitive-problem-by-id.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveProblemRepository } from '../../domain/interfaces/cognitive-problem.repository';
import { CognitiveProblem } from '../../domain/entities/cognitive-problem.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindCognitiveProblemByIdUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_PROBLEMS)
    private readonly repository: ICognitiveProblemRepository,
  ) {}

  async execute(id: string): Promise<CognitiveProblem> {
    const problem = await this.repository.findById(id);
    if (!problem) {
      throw new NotFoundException('Cognitive problem not found');
    }
    return problem;
  }
}
