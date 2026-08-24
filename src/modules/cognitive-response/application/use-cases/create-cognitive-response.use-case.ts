// application/use-cases/create-cognitive-response.use-case.ts
import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { CognitiveResponse } from '../../domain/entities/cognitive-response.entity';
import { CognitiveResponseStatus } from '../../domain/enums/cognitive-response-status.enum';
import { ICognitiveResponseRepository } from '../../domain/interfaces/cognitive-response.repository';
import { ICognitiveEvaluationRepository } from '../../../cognitive-evaluation/domain/interfaces/cognitive-evaluation.repository';
import { ICognitiveTaskRepository } from '../../../cognitive-evaluation-task/domain/interfaces/cognitive-task.repository';
import { ICognitiveEvaluatorRepository } from '../../../cognitive-evaluator/domain/interfaces/cognitive-evaluator.repository';
import { CreateCognitiveResponseDto } from '../dtos/create-cognitive-response.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class CreateCognitiveResponseUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_RESPONSES)
    private readonly responseRepository: ICognitiveResponseRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly evaluationRepository: ICognitiveEvaluationRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_TASK)
    private readonly taskRepository: ICognitiveTaskRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATOR)
    private readonly evaluatorRepository: ICognitiveEvaluatorRepository,
  ) {}

  async execute(dto: CreateCognitiveResponseDto): Promise<CognitiveResponse> {
    // Verificar que la evaluación existe
    const evaluation = await this.evaluationRepository.findById(dto.evaluationId);
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    // Verificar que la tarea existe
    const task = await this.taskRepository.findById(dto.taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Verificar que el evaluador está asignado a esta evaluación
    const evaluator = await this.evaluatorRepository.findByUserAndEvaluation(
      dto.evaluatorId,
      dto.evaluationId,
    );
    if (!evaluator) {
      throw new NotFoundException('Evaluator is not assigned to this evaluation');
    }

    // Verificar que no exista una respuesta previa para esta tarea y evaluador
    const existing = await this.responseRepository.findByTaskAndEvaluator(
      dto.taskId,
      dto.evaluatorId,
    );
    if (existing) {
      throw new ConflictException('A response for this task and evaluator already exists');
    }

    const response = new CognitiveResponse(
      crypto.randomUUID(),
      dto.evaluationId,
      dto.evaluatorId,
      dto.taskId,
      dto.actionId || null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      CognitiveResponseStatus.PENDING,
      new Date(),
      new Date(),
    );

    return this.responseRepository.create(response);
  }
}