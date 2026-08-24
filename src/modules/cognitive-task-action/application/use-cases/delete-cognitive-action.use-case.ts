
// application/use-cases/delete-cognitive-action.use-case.ts
import { Injectable, NotFoundException,Inject } from '@nestjs/common';
import { ICognitiveActionRepository } from '../../domain/interfaces/cognitive-action.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class DeleteCognitiveActionUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATION_ACTION)

    private readonly repository: ICognitiveActionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const action = await this.repository.findById(id);
    if (!action) {
      throw new NotFoundException('Cognitive action not found');
    }

    await this.repository.delete(id);
  }
}
