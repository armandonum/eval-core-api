
// application/use-cases/find-cognitive-response-by-id.use-case.ts
import { Injectable, NotFoundException,Inject } from '@nestjs/common';
import { ICognitiveResponseRepository } from '../../domain/interfaces/cognitive-response.repository';
import { CognitiveResponse } from '../../domain/entities/cognitive-response.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class FindCognitiveResponseByIdUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_RESPONSES)    
    private readonly repository: ICognitiveResponseRepository,
  ) {}

  async execute(id: string): Promise<CognitiveResponse> {
    const response = await this.repository.findById(id);
    if (!response) {
      throw new NotFoundException('Cognitive response not found');
    }
    return response;
  }
}