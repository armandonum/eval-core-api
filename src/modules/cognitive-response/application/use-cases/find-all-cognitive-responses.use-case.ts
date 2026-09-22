
// application/use-cases/find-all-cognitive-responses.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ICognitiveResponseRepository } from '../../domain/interfaces/cognitive-response.repository';
import { CognitiveResponse } from '../../domain/entities/cognitive-response.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindAllCognitiveResponsesUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_RESPONSES)
    private readonly repository: ICognitiveResponseRepository,
  ) {}

  async execute(): Promise<CognitiveResponse[]> {
    return this.repository.findAll();
  }
}
