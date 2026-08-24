
// application/use-cases/reorder-cognitive-actions.use-case.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICognitiveActionRepository } from '../../domain/interfaces/cognitive-action.repository';
import { ReorderActionsDto } from '../dtos/reorder-actions.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class ReorderCognitiveActionsUseCase {
  constructor(
        @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATION_ACTION)

    private readonly repository: ICognitiveActionRepository,
  ) {}

  async execute(taskId: string, dto: ReorderActionsDto): Promise<void> {
    // Verificar que todas las acciones existen
    const actions = await this.repository.findByTask(taskId);
    const actionIds = actions.map(a => a.id);
    
    for (const id of dto.actionIds) {
      if (!actionIds.includes(id)) {
        throw new NotFoundException(`Action with id ${id} not found in this task`);
      }
    }

    await this.repository.reorderActions(taskId, dto.actionIds);
  }
}