// application/use-cases/create-cognitive-action.use-case.ts
import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { CognitiveAction } from '../../domain/entities/cognitive-action.entity';
import { ICognitiveActionRepository } from '../../domain/interfaces/cognitive-action.repository';
import { ICognitiveTaskRepository } from '../../../cognitive-evaluation-task/domain/interfaces/cognitive-task.repository';
import { CreateCognitiveActionDto } from '../dtos/create-cognitive-action.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';


@Injectable()
export class CreateCognitiveActionUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATION_ACTION)
    private readonly actionRepository: ICognitiveActionRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_TASK)
    private readonly taskRepository: ICognitiveTaskRepository,
  ) {}

  async execute(dto: CreateCognitiveActionDto): Promise<CognitiveAction> {
    // Verificar que la tarea existe
    const task = await this.taskRepository.findById(dto.taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Verificar que la tarea puede recibir acciones
    if (!task.canAddActions()) {
      throw new ConflictException('Cannot add actions to a completed task');
    }

    // Obtener el siguiente orden
    const maxOrder = await this.actionRepository.getMaxStepOrder(dto.taskId);
    const stepOrder = dto.stepOrder ?? maxOrder + 1;

    const action = new CognitiveAction(
      crypto.randomUUID(),
      dto.taskId,
      stepOrder,
      dto.actionDescription,
      dto.expectedOutcome || null,
      dto.uiElement || null,
      dto.selectorPath || null,
      dto.successCriteria || null,
      new Date(),
    );

    // Validar la acción
    if (!action.isValid()) {
      throw new ConflictException('Action description cannot be empty');
    }

    return this.actionRepository.create(action);
  }
}