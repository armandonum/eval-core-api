// application/use-cases/find-cognitive-action-by-id.use-case.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICognitiveActionRepository } from '../../domain/interfaces/cognitive-action.repository';
import { CognitiveAction } from '../../domain/entities/cognitive-action.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class FindCognitiveActionByIdUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATION_ACTION)
    private readonly repository: ICognitiveActionRepository,
  ) {}

  async execute(id: string): Promise<CognitiveAction> {
    const action = await this.repository.findById(id);
    if (!action) {
      throw new NotFoundException('Cognitive action not found');
    }
    return action;
  }
}