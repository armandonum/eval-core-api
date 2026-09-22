
// application/use-cases/update-cognitive-problem-status.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveProblemRepository } from '../../domain/interfaces/cognitive-problem.repository';
import { CognitiveProblemStatus } from '../../domain/enums/cognitive-problem-status.enum';
import { CognitiveProblem } from '../../domain/entities/cognitive-problem.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class UpdateCognitiveProblemStatusUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_PROBLEMS)
    private readonly repository: ICognitiveProblemRepository,
  ) {}

  async execute(id: string, status: CognitiveProblemStatus, notes?: string): Promise<CognitiveProblem> {
    const problem = await this.repository.findById(id);
    if (!problem) {
      throw new NotFoundException('Cognitive problem not found');
    }

    switch (status) {
      case CognitiveProblemStatus.ANALYZING:
        problem.startAnalysis();
        break;
      case CognitiveProblemStatus.RESOLVED:
        if (!notes) {
          throw new Error('Resolution notes are required when resolving a problem');
        }
        problem.resolve(notes);
        break;
      case CognitiveProblemStatus.REJECTED:
        if (!notes) {
          throw new Error('Rejection reason is required when rejecting a problem');
        }
        problem.reject(notes);
        break;
      default:
        problem.status = status;
        problem.updatedAt = new Date();
    }

    return this.repository.update(problem);
  }
}