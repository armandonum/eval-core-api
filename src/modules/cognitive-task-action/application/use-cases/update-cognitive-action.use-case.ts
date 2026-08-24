
// application/use-cases/update-cognitive-action.use-case.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICognitiveActionRepository } from '../../domain/interfaces/cognitive-action.repository';
import { UpdateCognitiveActionDto } from '../dtos/update-cognitive-action.dto';
import { CognitiveAction } from '../../domain/entities/cognitive-action.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class UpdateCognitiveActionUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATION_ACTION)
    private readonly repository: ICognitiveActionRepository,
  ) {}

  async execute(id: string, dto: UpdateCognitiveActionDto): Promise<CognitiveAction> {
    const action = await this.repository.findById(id);
    if (!action) {
      throw new NotFoundException('Cognitive action not found');
    }

    // Actualizar campos
    if (dto.actionDescription !== undefined) {
      action.updateDetails(
        dto.actionDescription,
        dto.expectedOutcome ?? action.expectedOutcome,
        dto.uiElement ?? action.uiElement,
        dto.selectorPath ?? action.selectorPath,
        dto.successCriteria ?? action.successCriteria,
      );
    }

    if (dto.stepOrder !== undefined) {
      action.updateOrder(dto.stepOrder);
    }

    return this.repository.update(action);
  }
}
