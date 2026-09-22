
// application/use-cases/update-cognitive-response.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveResponseRepository } from '../../domain/interfaces/cognitive-response.repository';
import { UpdateCognitiveResponseDto } from '../dtos/update-cognitive-response.dto';
import { CognitiveResponse } from '../../domain/entities/cognitive-response.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';
@Injectable()
export class UpdateCognitiveResponseUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_RESPONSES)
    private readonly repository: ICognitiveResponseRepository,
  ) {}

  async execute(id: string, dto: UpdateCognitiveResponseDto): Promise<CognitiveResponse> {
    const response = await this.repository.findById(id);
    if (!response) {
      throw new NotFoundException('Cognitive response not found');
    }

    // Solo se pueden actualizar respuestas pendientes
    if (response.isCompleted()) {
      throw new Error('Cannot update a completed response');
    }

    response.updatePartial(
      dto.responseDescription,
      dto.systemResponse,
      dto.problemIdentified,
      dto.designSuggestion,
      dto.otherComments,
    );

    if (dto.status) {
      if (dto.status === 'skipped') {
        response.skip();
      }
    }

    return this.repository.update(response);
  }
}
