// infrastructure/typeorm/cognitive-response.mapper.ts
import { CognitiveResponse } from '../../domain/entities/cognitive-response.entity';
import { CognitiveResponseOrmEntity } from './cognitive-response.orm-entity';
import { CognitiveResponseStatus } from '../../domain/enums/cognitive-response-status.enum';
import { CognitiveQuestionAnswer } from '../../domain/enums/cognitive-question-answer.enum';

export class CognitiveResponseMapper {
  static toDomain(orm: CognitiveResponseOrmEntity): CognitiveResponse {
    return new CognitiveResponse(
      orm.id,
      orm.evaluation_id,
      orm.evaluator_id,
      orm.task_id,
      orm.action_id,
      orm.response_description,
      orm.system_response,
      orm.q1_will_user_try_correct_outcome,
      orm.q1_reasoning,
      orm.q2_will_user_notice_action,
      orm.q2_reasoning,
      orm.q3_will_user_associate_action,
      orm.q3_reasoning,
      orm.q4_will_user_see_progress,
      orm.q4_reasoning,
      orm.problem_identified,
      orm.design_suggestion,
      orm.other_comments,
      orm.time_spent_seconds,
      orm.success,
      orm.status,
      orm.created_at,
      orm.updated_at,
    );
  }

  static toPersistence(domain: CognitiveResponse): Partial<CognitiveResponseOrmEntity> {
    return {
      id: domain.id,
      evaluation_id: domain.evaluationId,
      evaluator_id: domain.evaluatorId,
      task_id: domain.taskId,
      action_id: domain.actionId,
      response_description: domain.responseDescription,
      system_response: domain.systemResponse,
      q1_will_user_try_correct_outcome: domain.q1WillUserTryCorrectOutcome,
      q1_reasoning: domain.q1Reasoning,
      q2_will_user_notice_action: domain.q2WillUserNoticeAction,
      q2_reasoning: domain.q2Reasoning,
      q3_will_user_associate_action: domain.q3WillUserAssociateAction,
      q3_reasoning: domain.q3Reasoning,
      q4_will_user_see_progress: domain.q4WillUserSeeProgress,
      q4_reasoning: domain.q4Reasoning,
      problem_identified: domain.problemIdentified,
      design_suggestion: domain.designSuggestion,
      other_comments: domain.otherComments,
      time_spent_seconds: domain.timeSpentSeconds,
      success: domain.success,
      status: domain.status,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  static toDomainArray(orms: CognitiveResponseOrmEntity[]): CognitiveResponse[] {
    return orms.map(orm => this.toDomain(orm));
  }
}