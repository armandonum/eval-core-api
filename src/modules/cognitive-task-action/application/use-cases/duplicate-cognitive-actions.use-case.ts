
// application/use-cases/duplicate-cognitive-actions.use-case.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICognitiveActionRepository } from '../../domain/interfaces/cognitive-action.repository';
import { ICognitiveTaskRepository } from '../../../cognitive-evaluation-task/domain/interfaces/cognitive-task.repository';
import { DuplicateActionsDto } from '../dtos/duplicate-actions.dto';
import { CognitiveAction } from '../../domain/entities/cognitive-action.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';



@Injectable()
export class DuplicateCognitiveActionsUseCase {
  constructor(

    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATION_ACTION)
    private readonly actionRepository: ICognitiveActionRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_TASK)
    private readonly taskRepository: ICognitiveTaskRepository,
  ) {}

  async execute(dto: DuplicateActionsDto): Promise<CognitiveAction[]> {
    // Verificar que la tarea origen existe
    const sourceTask = await this.taskRepository.findById(dto.sourceTaskId);
    if (!sourceTask) {
      throw new NotFoundException('Source task not found');
    }

    // Verificar que la tarea destino existe
    const targetTask = await this.taskRepository.findById(dto.targetTaskId);
    if (!targetTask) {
      throw new NotFoundException('Target task not found'); 
    }

    // Verificar que la tarea destino puede recibir acciones
    if (!targetTask.canAddActions()) {
      throw new Error('Cannot duplicate actions to a completed task');
    }

    return this.actionRepository.duplicateActions(dto.sourceTaskId, dto.targetTaskId);
  }
}