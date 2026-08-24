
// application/use-cases/delete-cognitive-response.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveResponseRepository } from '../../domain/interfaces/cognitive-response.repository';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class DeleteCognitiveResponseUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_RESPONSES)
    private readonly repository: ICognitiveResponseRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const response = await this.repository.findById(id);
    if (!response) {
      throw new NotFoundException('Cognitive response not found');
    }

    await this.repository.delete(id);
  }
}