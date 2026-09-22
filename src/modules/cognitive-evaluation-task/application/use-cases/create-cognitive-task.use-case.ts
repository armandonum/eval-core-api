// application/use-cases/create-cognitive-task.use-case.ts
import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { CognitiveTask } from '../../domain/entities/cognitive-task.entity';
import { CognitiveTaskStatus } from '../../domain/enums/cognitive-task-status.enum';
import { ICognitiveTaskRepository } from '../../domain/interfaces/cognitive-task.repository';
import { ICognitiveEvaluationRepository } from '../../../cognitive-evaluation/domain/interfaces/cognitive-evaluation.repository';
import { CreateCognitiveTaskDto } from '../dtos/create-cognitive-task.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class CreateCognitiveTaskUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_TASK)
    private readonly taskRepository: ICognitiveTaskRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly evaluationRepository: ICognitiveEvaluationRepository,
  ) {}

  async execute(dto: CreateCognitiveTaskDto): Promise<CognitiveTask> {
    // Verificar que la evaluación existe
    const evaluation = await this.evaluationRepository.findById(dto.evaluationId);
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    // Verificar que la evaluación puede aceptar nuevas tareas
    if (!evaluation.canAddTasks()) {
      throw new ConflictException(
        'Cannot add tasks to an evaluation that is already in progress or completed',
      );
    }

    // Obtener el siguiente orden
    const maxOrder = await this.taskRepository.getMaxOrderIndex(dto.evaluationId);
    const orderIndex = dto.orderIndex ?? maxOrder + 1;

    const task = new CognitiveTask(
      crypto.randomUUID(),
      dto.evaluationId,
      dto.projectTaskId || null,
      dto.title,
      dto.description || null,
      dto.userGoal || null,
      orderIndex,
      CognitiveTaskStatus.PENDING,
      new Date(),
      new Date(),
    );

    return this.taskRepository.create(task);
  }
}