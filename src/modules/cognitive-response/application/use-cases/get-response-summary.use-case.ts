
// application/use-cases/get-response-summary.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveResponseRepository } from '../../domain/interfaces/cognitive-response.repository';
import { ICognitiveEvaluationRepository } from '../../../cognitive-evaluation/domain/interfaces/cognitive-evaluation.repository';
import { CognitiveResponseSummaryDto, TaskIssueSummary } from '../dtos/cognitive-response-summary.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class GetResponseSummaryUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_RESPONSES)
    private readonly responseRepository: ICognitiveResponseRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly evaluationRepository: ICognitiveEvaluationRepository,
  ) {}

  async execute(evaluationId: string): Promise<CognitiveResponseSummaryDto> {
    const evaluation = await this.evaluationRepository.findById(evaluationId);
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    const responses = await this.responseRepository.findByEvaluation(evaluationId);
    const stats = await this.responseRepository.getStatsByEvaluation(evaluationId);
    const issues = await this.responseRepository.getIssuesByEvaluation(evaluationId);

    const total = responses.length;
    const completed = responses.filter(r => r.isCompleted()).length;
    const pending = responses.filter(r => r.isPending()).length;
    const skipped = responses.filter(r => r.isSkipped()).length;
    const withIssues = responses.filter(r => r.hasIssues()).length;

    return {
      evaluationId,
      totalResponses: total,
      completedResponses: completed,
      pendingResponses: pending,
      skippedResponses: skipped,
      responsesWithIssues: withIssues,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      issueRate: total > 0 ? Math.round((withIssues / total) * 100) : 0,
      averageTimeSeconds: stats.averageTimeSeconds,
      successRate: stats.successRate,
      questionsSummary: {
        q1: { yes: stats.questionStats.q1Yes, no: stats.questionStats.q1No, uncertain: stats.questionStats.q1Uncertain },
        q2: { yes: stats.questionStats.q2Yes, no: stats.questionStats.q2No, uncertain: stats.questionStats.q2Uncertain },
        q3: { yes: stats.questionStats.q3Yes, no: stats.questionStats.q3No, uncertain: stats.questionStats.q3Uncertain },
        q4: { yes: stats.questionStats.q4Yes, no: stats.questionStats.q4No, uncertain: stats.questionStats.q4Uncertain },
      },
      issuesByTask: issues.map((i: any) => ({
        taskId: i.taskId,
        taskTitle: i.taskTitle,
        totalIssues: i.issueCount,
        q1Issues: i.q1Issues,
        q2Issues: i.q2Issues,
        q3Issues: i.q3Issues,
        q4Issues: i.q4Issues,
        problems: i.problems || [],
      })),
    };
  }
}