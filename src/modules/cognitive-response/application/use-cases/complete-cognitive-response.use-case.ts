
// application/use-cases/complete-cognitive-response.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveResponseRepository } from '../../domain/interfaces/cognitive-response.repository';
import { CompleteCognitiveResponseDto } from '../dtos/complete-cognitive-response.dto';
import { CognitiveResponse } from '../../domain/entities/cognitive-response.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class CompleteCognitiveResponseUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_RESPONSES)
    private readonly responseRepository: ICognitiveResponseRepository,
  ) {}

  async execute(id: string, dto: CompleteCognitiveResponseDto): Promise<CognitiveResponse> {
    const response = await this.responseRepository.findById(id);
    if (!response) {
      throw new NotFoundException('Cognitive response not found');
    }

    // Validar que todas las preguntas estén respondidas
    if (!dto.q1WillUserTryCorrectOutcome || !dto.q2WillUserNoticeAction ||
        !dto.q3WillUserAssociateAction || !dto.q4WillUserSeeProgress) {
      throw new Error('All four questions must be answered');
    }

    response.complete(
      dto.responseDescription,
      dto.systemResponse || null,
      dto.q1WillUserTryCorrectOutcome,
      dto.q1Reasoning || null,
      dto.q2WillUserNoticeAction,
      dto.q2Reasoning || null,
      dto.q3WillUserAssociateAction,
      dto.q3Reasoning || null,
      dto.q4WillUserSeeProgress,
      dto.q4Reasoning || null,
      dto.problemIdentified || null,
      dto.designSuggestion || null,
      dto.otherComments || null,
      dto.timeSpentSeconds,
      dto.success,
    );

    return this.responseRepository.update(response);
  }
}
