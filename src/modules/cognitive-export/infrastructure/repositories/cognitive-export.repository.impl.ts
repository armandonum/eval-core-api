// infrastructure/repositories/cognitive-export.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICognitiveExportRepository, IExportData } from '../../domain/interfaces/cognitive-export.repository';
import { CognitiveEvaluationOrmEntity } from '../../../cognitive-evaluation/infrastructure/typeorm/cognitive-evaluation.orm-entity';
import { CognitiveTaskOrmEntity } from '../../../cognitive-evaluation-task/infrastructure/typeorm/cognitive-task.orm-entity';
import { CognitiveResponseOrmEntity } from '../../../cognitive-response/infrastructure/typeorm/cognitive-response.orm-entity';
import { CognitiveEvaluatorOrmEntity } from '../../../cognitive-evaluator/infrastructure/typeorm/cognitive-evaluator.orm-entity';

@Injectable()
export class CognitiveExportRepository implements ICognitiveExportRepository {
  constructor(
    @InjectRepository(CognitiveEvaluationOrmEntity)
    private readonly evaluationRepo: Repository<CognitiveEvaluationOrmEntity>,
    @InjectRepository(CognitiveTaskOrmEntity)
    private readonly taskRepo: Repository<CognitiveTaskOrmEntity>,
    @InjectRepository(CognitiveResponseOrmEntity)
    private readonly responseRepo: Repository<CognitiveResponseOrmEntity>,
    @InjectRepository(CognitiveEvaluatorOrmEntity)
    private readonly evaluatorRepo: Repository<CognitiveEvaluatorOrmEntity>,
  ) {}

  async getExportData(evaluationId: string): Promise<IExportData> {
    // Obtener evaluación
    const evaluation = await this.evaluationRepo.findOne({
      where: { cognitive_evaluations_id: evaluationId },
    });

    if (!evaluation) {
      throw new Error('Evaluation not found');
    }

    // Obtener tareas
    const tasks = await this.taskRepo.find({
      where: { evaluation_id: evaluationId },
      order: { order_index: 'ASC' },
    });

    // Obtener evaluadores
    const evaluators = await this.evaluatorRepo.find({
      where: { evaluation_id: evaluationId },
    });

    // Obtener respuestas
    const responses = await this.responseRepo.find({
      where: { evaluation_id: evaluationId },
      order: { created_at: 'ASC' },
    });

    // Construir datos de exportación
    const exportResponses = responses.map((response) => {
      const task = tasks.find(t => t.id === response.task_id);
      const evaluator = evaluators.find(e => e.user_id === response.evaluator_id);

      return {
        taskTitle: task?.title || 'Sin tarea',
        evaluatorName: evaluator?.user_id || 'Desconocido',
        responseDescription: response.response_description || '',
        systemResponse: response.system_response || '',
        q1Answer: response.q1_will_user_try_correct_outcome || '',
        q1Reasoning: response.q1_reasoning || '',
        q2Answer: response.q2_will_user_notice_action || '',
        q2Reasoning: response.q2_reasoning || '',
        q3Answer: response.q3_will_user_associate_action || '',
        q3Reasoning: response.q3_reasoning || '',
        q4Answer: response.q4_will_user_see_progress || '',
        q4Reasoning: response.q4_reasoning || '',
        problemIdentified: response.problem_identified || '',
        designSuggestion: response.design_suggestion || '',
        otherComments: response.other_comments || '',
        timeSpentSeconds: response.time_spent_seconds || 0,
        success: response.success || false,
        responseStatus: response.status || 'pending',
        responseCreatedAt: response.created_at,
      };
    });

    return {
      evaluation: {
        id: evaluation.cognitive_evaluations_id,
        name: evaluation.name,
        description: evaluation.description || '',
        status: evaluation.status,
        startedAt: evaluation.started_at,
        completedAt: evaluation.completed_at,
        createdAt: evaluation.created_at,
      },
      tasks: tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        orderIndex: task.order_index,
        status: task.status,
        userGoal: task.user_goal || '',
      })),
      evaluators: evaluators.map((evaluator) => ({
        id: evaluator.id,
        userId: evaluator.user_id,
        role: evaluator.evaluator_role,
        assignedAt: evaluator.assigned_at,
        completedAt: evaluator.completed_at,
        notes: evaluator.notes || '',
      })),
      responses: exportResponses,
    };
  }
}