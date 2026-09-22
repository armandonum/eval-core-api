// infrastructure/repositories/cognitive-response.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICognitiveResponseRepository, ResponseStats, IssueSummary } from '../../domain/interfaces/cognitive-response.repository';
import { CognitiveResponse } from '../../domain/entities/cognitive-response.entity';
import { CognitiveResponseOrmEntity } from '../typeorm/cognitive-response.orm-entity';
import { CognitiveResponseMapper } from '../typeorm/cognitive-response.mapper';
import { CognitiveResponseStatus } from '../../domain/enums/cognitive-response-status.enum';
import { CognitiveQuestionAnswer } from '../../domain/enums/cognitive-question-answer.enum';

@Injectable()
export class CognitiveResponseRepository implements ICognitiveResponseRepository {
  constructor(
    @InjectRepository(CognitiveResponseOrmEntity)
    private readonly repository: Repository<CognitiveResponseOrmEntity>,
  ) {}

  async create(response: CognitiveResponse): Promise<CognitiveResponse> {
    const orm = CognitiveResponseMapper.toPersistence(response);
    const saved = await this.repository.save(orm as CognitiveResponseOrmEntity);
    return CognitiveResponseMapper.toDomain(saved);
  }

  async update(response: CognitiveResponse): Promise<CognitiveResponse> {
    const orm = CognitiveResponseMapper.toPersistence(response);
    const saved = await this.repository.save(orm as CognitiveResponseOrmEntity);
    return CognitiveResponseMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<CognitiveResponse | null> {
    const orm = await this.repository.findOne({
      where: { id },
    });
    return orm ? CognitiveResponseMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<CognitiveResponse[]> {
    const query = await this.repository.find({
        order: {created_at: 'ASC' }
    })
    
    return CognitiveResponseMapper.toDomainArray(query);
  }

  async findByEvaluation(evaluationId: string): Promise<CognitiveResponse[]> {
    const orms = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { created_at: 'DESC' },
    });
    return CognitiveResponseMapper.toDomainArray(orms);
  }

  async findByEvaluator(evaluatorId: string): Promise<CognitiveResponse[]> {
    const orms = await this.repository.find({
      where: { evaluator_id: evaluatorId },
      order: { created_at: 'DESC' },
    });
    return CognitiveResponseMapper.toDomainArray(orms);
  }

  async findByTask(taskId: string): Promise<CognitiveResponse[]> {
    const orms = await this.repository.find({
      where: { task_id: taskId },
      order: { created_at: 'DESC' },
    });
    return CognitiveResponseMapper.toDomainArray(orms);
  }

  async findByAction(actionId: string): Promise<CognitiveResponse[]> {
    const orms = await this.repository.find({
      where: { action_id: actionId },
      order: { created_at: 'DESC' },
    });
    return CognitiveResponseMapper.toDomainArray(orms);
  }

  async findByEvaluationAndEvaluator(
    evaluationId: string,
    evaluatorId: string,
  ): Promise<CognitiveResponse[]> {
    const orms = await this.repository.find({
      where: {
        evaluation_id: evaluationId,
        evaluator_id: evaluatorId,
      },
      order: { created_at: 'ASC' },
    });
    return CognitiveResponseMapper.toDomainArray(orms);
  }

  async findByTaskAndEvaluator(
    taskId: string,
    evaluatorId: string,
  ): Promise<CognitiveResponse | null> {
    const orm = await this.repository.findOne({
      where: {
        task_id: taskId,
        evaluator_id: evaluatorId,
      },
    });
    return orm ? CognitiveResponseMapper.toDomain(orm) : null;
  }

  async findByEvaluationAndStatus(
    evaluationId: string,
    status: CognitiveResponseStatus,
  ): Promise<CognitiveResponse[]> {
    const orms = await this.repository.find({
      where: {
        evaluation_id: evaluationId,
        status,
      },
      order: { created_at: 'ASC' },
    });
    return CognitiveResponseMapper.toDomainArray(orms);
  }

  async countByEvaluation(evaluationId: string): Promise<number> {
    return this.repository.count({
      where: { evaluation_id: evaluationId },
    });
  }

  async countByEvaluator(evaluatorId: string): Promise<number> {
    return this.repository.count({
      where: { evaluator_id: evaluatorId },
    });
  }

  async countByTask(taskId: string): Promise<number> {
    return this.repository.count({
      where: { task_id: taskId },
    });
  }

  async getStatsByEvaluation(evaluationId: string): Promise<ResponseStats> {
    const responses = await this.findByEvaluation(evaluationId);
    const completed = responses.filter(r => r.isCompleted());
    const withIssues = responses.filter(r => r.hasIssues());

    // Estadísticas de preguntas
    const qStats = {
      q1Yes: 0, q1No: 0, q1Uncertain: 0,
      q2Yes: 0, q2No: 0, q2Uncertain: 0,
      q3Yes: 0, q3No: 0, q3Uncertain: 0,
      q4Yes: 0, q4No: 0, q4Uncertain: 0,
    };

    for (const r of completed) {
      const q1 = r.q1WillUserTryCorrectOutcome;
      const q2 = r.q2WillUserNoticeAction;
      const q3 = r.q3WillUserAssociateAction;
      const q4 = r.q4WillUserSeeProgress;

      if (q1 === CognitiveQuestionAnswer.YES) qStats.q1Yes++;
      else if (q1 === CognitiveQuestionAnswer.NO) qStats.q1No++;
      else if (q1 === CognitiveQuestionAnswer.UNCERTAIN) qStats.q1Uncertain++;

      if (q2 === CognitiveQuestionAnswer.YES) qStats.q2Yes++;
      else if (q2 === CognitiveQuestionAnswer.NO) qStats.q2No++;
      else if (q2 === CognitiveQuestionAnswer.UNCERTAIN) qStats.q2Uncertain++;

      if (q3 === CognitiveQuestionAnswer.YES) qStats.q3Yes++;
      else if (q3 === CognitiveQuestionAnswer.NO) qStats.q3No++;
      else if (q3 === CognitiveQuestionAnswer.UNCERTAIN) qStats.q3Uncertain++;

      if (q4 === CognitiveQuestionAnswer.YES) qStats.q4Yes++;
      else if (q4 === CognitiveQuestionAnswer.NO) qStats.q4No++;
      else if (q4 === CognitiveQuestionAnswer.UNCERTAIN) qStats.q4Uncertain++;
    }

    const totalTime = completed.reduce((sum, r) => sum + (r.timeSpentSeconds || 0), 0);
    const avgTime = completed.length > 0 ? Math.round(totalTime / completed.length) : 0;
    const successCount = completed.filter(r => r.success === true).length;
    const successRate = completed.length > 0 ? Math.round((successCount / completed.length) * 100) : 0;

    return {
      total: responses.length,
      completed: completed.length,
      pending: responses.filter(r => r.isPending()).length,
      skipped: responses.filter(r => r.isSkipped()).length,
      withIssues: withIssues.length,
      averageTimeSeconds: avgTime,
      successRate,
      questionStats: qStats,
    };
  }

  async getIssuesByEvaluation(evaluationId: string): Promise<IssueSummary[]> {
    const query = `
      SELECT 
        cr.task_id,
        t.title as task_title,
        COUNT(CASE WHEN cr.q1_will_user_try_correct_outcome = 'no' THEN 1 END) as q1_issues,
        COUNT(CASE WHEN cr.q2_will_user_notice_action = 'no' THEN 1 END) as q2_issues,
        COUNT(CASE WHEN cr.q3_will_user_associate_action = 'no' THEN 1 END) as q3_issues,
        COUNT(CASE WHEN cr.q4_will_user_see_progress = 'no' THEN 1 END) as q4_issues,
        COUNT(*) as issue_count,
        STRING_AGG(DISTINCT cr.problem_identified, '; ') as problems
      FROM usability.cognitive_responses cr
      JOIN usability.cognitive_evaluation_tasks t ON t.id = cr.task_id
      WHERE cr.evaluation_id = $1
        AND cr.status = 'completed'
        AND (
          cr.q1_will_user_try_correct_outcome = 'no' OR
          cr.q2_will_user_notice_action = 'no' OR
          cr.q3_will_user_associate_action = 'no' OR
          cr.q4_will_user_see_progress = 'no'
        )
      GROUP BY cr.task_id, t.title
      ORDER BY issue_count DESC
    `;

    const results = await this.repository.query(query, [evaluationId]);
    return results.map((r: any) => ({
      taskId: r.task_id,
      taskTitle: r.task_title,
      issueCount: parseInt(r.issue_count),
      q1Issues: parseInt(r.q1_issues),
      q2Issues: parseInt(r.q2_issues),
      q3Issues: parseInt(r.q3_issues),
      q4Issues: parseInt(r.q4_issues),
      problems: r.problems ? r.problems.split('; ').filter((p: string) => p.trim()) : [],
    }));
  }

  async deleteByEvaluation(evaluationId: string): Promise<void> {
    await this.repository.delete({ evaluation_id: evaluationId });
  }

  async deleteByTask(taskId: string): Promise<void> {
    await this.repository.delete({ task_id: taskId });
  }
}