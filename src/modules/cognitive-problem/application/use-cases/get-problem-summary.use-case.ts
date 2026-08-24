
// application/use-cases/get-problem-summary.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveProblemRepository } from '../../domain/interfaces/cognitive-problem.repository';
import { ICognitiveEvaluationRepository } from '../../../cognitive-evaluation/domain/interfaces/cognitive-evaluation.repository';
import { ICognitiveTaskRepository } from '../../../cognitive-evaluation-task/domain/interfaces/cognitive-task.repository';
import { CognitiveProblemSummaryDto, TaskProblemCount } from '../dtos/cognitive-problem-summary.dto';
import { CognitiveProblemSeverity } from '../../domain/enums/cognitive-problem-severity.enum';
import { CognitiveProblemStatus } from '../../domain/enums/cognitive-problem-status.enum';
import { CognitiveProblem } from '../../domain/entities/cognitive-problem.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class GetProblemSummaryUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_PROBLEMS)
    private readonly problemRepository: ICognitiveProblemRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly evaluationRepository: ICognitiveEvaluationRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_TASK)
    private readonly taskRepository: ICognitiveTaskRepository,
  ) {}

  async execute(evaluationId: string): Promise<CognitiveProblemSummaryDto> {
    const evaluation = await this.evaluationRepository.findById(evaluationId);
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    const problems = await this.problemRepository.findByEvaluation(evaluationId);
    const bySeverity = await this.problemRepository.countBySeverity(evaluationId);
    const byCategory = await this.problemRepository.countByCategory(evaluationId);
    const byStatus = await this.problemRepository.countByStatus(evaluationId);

    const activeProblems = problems.filter(p => p.isActive()).length;
    const resolvedProblems = problems.filter(p => p.isResolved()).length;
    const total = problems.length;
    const resolutionRate = total > 0 ? Math.round((resolvedProblems / total) * 100) : 0;

    // Top problemas por severidad
    const sortedProblems = [...problems]
      .sort((a, b) => b.getSeverityScore() - a.getSeverityScore())
      .slice(0, 5);

    // Tareas más afectadas
    const taskProblemCount = new Map<string, { count: number; critical: number }>();
    for (const problem of problems) {
      for (const taskId of problem.affectedTasks) {
        if (!taskProblemCount.has(taskId)) {
          taskProblemCount.set(taskId, { count: 0, critical: 0 });
        }
        const stats = taskProblemCount.get(taskId)!;
        stats.count++;
        if (problem.isCritical()) {
          stats.critical++;
        }
      }
    }

    const mostAffectedTasks: TaskProblemCount[] = [];
    for (const [taskId, stats] of taskProblemCount) {
      const task = await this.taskRepository.findById(taskId);
      mostAffectedTasks.push({
        taskId,
        taskTitle: task?.title || 'Unknown Task',
        problemCount: stats.count,
        criticalCount: stats.critical,
      });
    }
    mostAffectedTasks.sort((a, b) => b.problemCount - a.problemCount);

    return {
      evaluationId,
      totalProblems: total,
      bySeverity: {
        critical: bySeverity[CognitiveProblemSeverity.CRITICAL] || 0,
        high: bySeverity[CognitiveProblemSeverity.HIGH] || 0,
        medium: bySeverity[CognitiveProblemSeverity.MEDIUM] || 0,
        low: bySeverity[CognitiveProblemSeverity.LOW] || 0,
      },
      byCategory: {
        design: byCategory.design || 0,
        functionality: byCategory.functionality || 0,
        navigation: byCategory.navigation || 0,
        content: byCategory.content || 0,
        performance: byCategory.performance || 0,
        accessibility: byCategory.accessibility || 0,
        usability: byCategory.usability || 0,
        other: byCategory.other || 0,
      },
      byStatus: {
        identified: byStatus[CognitiveProblemStatus.IDENTIFIED] || 0,
        analyzing: byStatus[CognitiveProblemStatus.ANALYZING] || 0,
        resolved: byStatus[CognitiveProblemStatus.RESOLVED] || 0,
        rejected: byStatus[CognitiveProblemStatus.REJECTED] || 0,
      },
      activeProblems,
      resolvedProblems,
      resolutionRate,
      topProblems: sortedProblems.map(p => this.toResponseDto(p)),
      mostAffectedTasks: mostAffectedTasks.slice(0, 5),
    };
  }

  private toResponseDto(problem: CognitiveProblem): any {
    return {
      id: problem.id,
      evaluationId: problem.evaluationId,
      title: problem.title,
      description: problem.description,
      severity: problem.severity,
      category: problem.category,
      reportedBy: problem.reportedBy,
      affectedTasks: problem.affectedTasks,
      status: problem.status,
      resolutionNotes: problem.resolutionNotes,
      createdAt: problem.createdAt,
      updatedAt: problem.updatedAt,
      isCritical: problem.isCritical(),
      isHighPriority: problem.isHighPriority(),
      isActive: problem.isActive(),
      severityScore: problem.getSeverityScore(),
    };
  }
}