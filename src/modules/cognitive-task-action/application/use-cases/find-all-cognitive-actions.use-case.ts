
// application/use-cases/find-all-cognitive-actions.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ICognitiveActionRepository, FindActionsOptions } from '../../domain/interfaces/cognitive-action.repository';
import { CognitiveAction } from '../../domain/entities/cognitive-action.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class FindAllCognitiveActionsUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATION_ACTION)
    private readonly repository: ICognitiveActionRepository,
  ) {}

  async execute(): Promise<CognitiveAction[]> {
    return this.repository.findAll();
  }
}