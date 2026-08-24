// infrastructure/repositories/cognitive-dashboard.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ICognitiveDashboardRepository,
  IDashboardStats,
  IEvaluatorProgress,
  IRecentResponse,
} from '../../domain/interfaces/cognitive-dashboard.repository';
import { CognitiveDashboard } from '../../domain/entities/cognitive-dashboard.entity';
import { CognitiveDashboardOrmEntity } from '../typeorm/cognitive-dashboard.orm-entity';
import { CognitiveDashboardMapper } from '../typeorm/cognitive-dashboard.mapper';

@Injectable()
export class CognitiveDashboardRepository implements ICognitiveDashboardRepository {
  constructor(
    @InjectRepository(CognitiveDashboardOrmEntity)
    private readonly repository: Repository<CognitiveDashboardOrmEntity>,
  ) {}

  async getDashboardStats(evaluationId: string): Promise<IDashboardStats> {
    const query = `
      SELECT 
        COUNT(DISTINCT t.id) as total_tasks,
        COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) as completed_tasks,
        COUNT(DISTINCT CASE WHEN t.status = 'in_progress' THEN t.id END) as in_progress_tasks,
        COUNT(DISTINCT CASE WHEN t.status = 'failed' THEN t.id END) as failed_tasks,
        COUNT(DISTINCT CASE WHEN t.status = 'pending' THEN t.id END) as pending_tasks,
        COUNT(DISTINCT e.id) as total_evaluators,
        COUNT(DISTINCT CASE WHEN e.completed_at IS NOT NULL THEN e.id END) as completed_evaluators,
        COUNT(DISTINCT CASE WHEN e.completed_at IS NULL THEN e.id END) as pending_evaluators,
        COUNT(DISTINCT r.id) as total_responses,
        COUNT(DISTINCT CASE WHEN r.status = 'completed' THEN r.id END) as completed_responses,
        COUNT(DISTINCT CASE WHEN r.status = 'pending' THEN r.id END) as pending_responses,
        COUNT(DISTINCT CASE 
          WHEN r.q1_will_user_try_correct_outcome = 'no' 
            OR r.q2_will_user_notice_action = 'no'
            OR r.q3_will_user_associate_action = 'no'
            OR r.q4_will_user_see_progress = 'no'
          THEN r.id 
        END) as responses_with_issues,
        COALESCE(AVG(r.time_spent_seconds), 0) as average_time_seconds,
        COALESCE(
          ROUND((COUNT(DISTINCT CASE WHEN r.success = true THEN r.id END) * 100.0) / NULLIF(COUNT(DISTINCT r.id), 0), 2), 
          0
        ) as success_rate,
        COUNT(DISTINCT CASE WHEN r.q1_will_user_try_correct_outcome = 'yes' THEN r.id END) as q1_yes,
        COUNT(DISTINCT CASE WHEN r.q1_will_user_try_correct_outcome = 'no' THEN r.id END) as q1_no,
        COUNT(DISTINCT CASE WHEN r.q1_will_user_try_correct_outcome = 'uncertain' THEN r.id END) as q1_uncertain,
        COUNT(DISTINCT CASE WHEN r.q2_will_user_notice_action = 'yes' THEN r.id END) as q2_yes,
        COUNT(DISTINCT CASE WHEN r.q2_will_user_notice_action = 'no' THEN r.id END) as q2_no,
        COUNT(DISTINCT CASE WHEN r.q2_will_user_notice_action = 'uncertain' THEN r.id END) as q2_uncertain,
        COUNT(DISTINCT CASE WHEN r.q3_will_user_associate_action = 'yes' THEN r.id END) as q3_yes,
        COUNT(DISTINCT CASE WHEN r.q3_will_user_associate_action = 'no' THEN r.id END) as q3_no,
        COUNT(DISTINCT CASE WHEN r.q3_will_user_associate_action = 'uncertain' THEN r.id END) as q3_uncertain,
        COUNT(DISTINCT CASE WHEN r.q4_will_user_see_progress = 'yes' THEN r.id END) as q4_yes,
        COUNT(DISTINCT CASE WHEN r.q4_will_user_see_progress = 'no' THEN r.id END) as q4_no,
        COUNT(DISTINCT CASE WHEN r.q4_will_user_see_progress = 'uncertain' THEN r.id END) as q4_uncertain,
        COALESCE(
          ROUND((COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) * 100.0) / NULLIF(COUNT(DISTINCT t.id), 0), 0),
          0
        ) as progress_percentage
      FROM usability.cognitive_evaluation_tasks t
      LEFT JOIN usability.cognitive_evaluators e ON e.evaluation_id = t.evaluation_id
      LEFT JOIN usability.cognitive_responses r ON r.task_id = t.id AND r.evaluator_id = e.user_id
      WHERE t.evaluation_id = $1
    `;

    const result = await this.repository.query(query, [evaluationId]);
    return result[0] || this.getEmptyStats();
  }

  async getEvaluatorProgress(evaluationId: string): Promise<IEvaluatorProgress[]> {
    const query = `
      SELECT 
        e.id as evaluator_id,
        e.user_id,
        COUNT(DISTINCT t.id) as total_tasks,
        COUNT(DISTINCT CASE WHEN r.status = 'completed' THEN r.id END) as completed_responses,
        CASE WHEN e.completed_at IS NOT NULL THEN true ELSE false END as completed
      FROM usability.cognitive_evaluators e
      LEFT JOIN usability.cognitive_evaluation_tasks t ON t.evaluation_id = e.evaluation_id
      LEFT JOIN usability.cognitive_responses r ON r.task_id = t.id AND r.evaluator_id = e.user_id
      WHERE e.evaluation_id = $1
      GROUP BY e.id, e.user_id, e.completed_at
    `;

    const results = await this.repository.query(query, [evaluationId]);
    
    return results.map((r: any) => ({
      evaluatorId: r.evaluator_id,
      evaluatorName: r.user_id,
      progress: r.total_tasks > 0 ? Math.round((r.completed_responses / r.total_tasks) * 100) : 0,
      completed: r.completed,
      tasksCompleted: r.completed_responses || 0,
      totalTasks: r.total_tasks || 0,
    }));
  }

  async getRecentResponses(evaluationId: string, limit: number = 5): Promise<IRecentResponse[]> {
    const query = `
      SELECT 
        r.id,
        t.title as task_title,
        r.evaluator_id,
        r.status,
        r.created_at,
        CASE 
          WHEN r.q1_will_user_try_correct_outcome = 'no' 
            OR r.q2_will_user_notice_action = 'no'
            OR r.q3_will_user_associate_action = 'no'
            OR r.q4_will_user_see_progress = 'no'
          THEN true
          ELSE false
        END as has_issues
      FROM usability.cognitive_responses r
      JOIN usability.cognitive_evaluation_tasks t ON t.id = r.task_id
      WHERE r.evaluation_id = $1
      ORDER BY r.created_at DESC
      LIMIT $2
    `;

    const results = await this.repository.query(query, [evaluationId, limit]);
    
    return results.map((r: any) => ({
      id: r.id,
      taskTitle: r.task_title,
      evaluatorName: r.evaluator_id,
      status: r.status,
      createdAt: r.created_at,
      hasIssues: r.has_issues,
    }));
  }

  async saveDashboardSummary(dashboard: CognitiveDashboard): Promise<CognitiveDashboard> {
    const orm = CognitiveDashboardMapper.toPersistence(dashboard);
    const saved = await this.repository.save(orm);
    return CognitiveDashboardMapper.toDomain(saved);
  }

  async getDashboardSummary(evaluationId: string): Promise<CognitiveDashboard | null> {
    const orm = await this.repository.findOne({
      where: { evaluation_id: evaluationId },
    });
    return orm ? CognitiveDashboardMapper.toDomain(orm) : null;
  }

  async getEvaluationName(evaluationId: string): Promise<string> {
    const query = `
      SELECT name FROM usability.cognitive_evaluations 
      WHERE cognitive_evaluations_id = $1
    `;
    const result = await this.repository.query(query, [evaluationId]);
    return result[0]?.name || 'Evaluación sin nombre';
  }

  private getEmptyStats(): IDashboardStats {
    return {
      totalTasks: 0,
      completedTasks: 0,
      inProgressTasks: 0,
      failedTasks: 0,
      pendingTasks: 0,
      totalEvaluators: 0,
      completedEvaluators: 0,
      pendingEvaluators: 0,
      totalResponses: 0,
      completedResponses: 0,
      pendingResponses: 0,
      responsesWithIssues: 0,
      averageTimeSeconds: 0,
      successRate: 0,
      q1Yes: 0,
      q1No: 0,
      q1Uncertain: 0,
      q2Yes: 0,
      q2No: 0,
      q2Uncertain: 0,
      q3Yes: 0,
      q3No: 0,
      q3Uncertain: 0,
      q4Yes: 0,
      q4No: 0,
      q4Uncertain: 0,
      progressPercentage: 0,
    };
  }
}