
// application/use-cases/find-all-cognitive-problems.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ICognitiveProblemRepository } from '../../domain/interfaces/cognitive-problem.repository';
import { CognitiveProblem } from '../../domain/entities/cognitive-problem.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindAllCognitiveProblemsUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_PROBLEMS)
    private readonly repository: ICognitiveProblemRepository,
  ) {}

  async execute(): Promise<CognitiveProblem[]> {
    return this.repository.findAll();
  }
}
