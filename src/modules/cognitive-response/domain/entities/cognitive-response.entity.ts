// domain/entities/cognitive-response.entity.ts
import { CognitiveResponseStatus } from '../enums/cognitive-response-status.enum';
import { CognitiveQuestionAnswer } from '../enums/cognitive-question-answer.enum';

export class CognitiveResponse {
  constructor(
    public readonly id: string,
    public readonly evaluationId: string,
    public readonly evaluatorId: string,
    public readonly taskId: string,
    public readonly actionId: string | null,
    public responseDescription: string | null,
    public systemResponse: string | null,
    // Las 4 preguntas del recorrido cognitivo
    public q1WillUserTryCorrectOutcome: CognitiveQuestionAnswer | null,
    public q1Reasoning: string | null,
    public q2WillUserNoticeAction: CognitiveQuestionAnswer | null,
    public q2Reasoning: string | null,
    public q3WillUserAssociateAction: CognitiveQuestionAnswer | null,
    public q3Reasoning: string | null,
    public q4WillUserSeeProgress: CognitiveQuestionAnswer | null,
    public q4Reasoning: string | null,
    // Problemas y sugerencias
    public problemIdentified: string | null,
    public designSuggestion: string | null,
    public otherComments: string | null,
    // Métricas
    public timeSpentSeconds: number | null,
    public success: boolean | null,
    public status: CognitiveResponseStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  // Métodos de dominio
  complete(
    responseDescription: string,
    systemResponse: string | null,
    q1: CognitiveQuestionAnswer,
    q1Reasoning: string | null,
    q2: CognitiveQuestionAnswer,
    q2Reasoning: string | null,
    q3: CognitiveQuestionAnswer,
    q3Reasoning: string | null,
    q4: CognitiveQuestionAnswer,
    q4Reasoning: string | null,
    problemIdentified: string | null,
    designSuggestion: string | null,
    otherComments: string | null,
    timeSpentSeconds: number,
    success: boolean,
  ): void {
    this.responseDescription = responseDescription;
    this.systemResponse = systemResponse;
    this.q1WillUserTryCorrectOutcome = q1;
    this.q1Reasoning = q1Reasoning;
    this.q2WillUserNoticeAction = q2;
    this.q2Reasoning = q2Reasoning;
    this.q3WillUserAssociateAction = q3;
    this.q3Reasoning = q3Reasoning;
    this.q4WillUserSeeProgress = q4;
    this.q4Reasoning = q4Reasoning;
    this.problemIdentified = problemIdentified;
    this.designSuggestion = designSuggestion;
    this.otherComments = otherComments;
    this.timeSpentSeconds = timeSpentSeconds;
    this.success = success;
    this.status = CognitiveResponseStatus.COMPLETED;
    this.updatedAt = new Date();
  }

  skip(): void {
    this.status = CognitiveResponseStatus.SKIPPED;
    this.updatedAt = new Date();
  }

  updatePartial(
    responseDescription?: string,
    systemResponse?: string | null,
    problemIdentified?: string | null,
    designSuggestion?: string | null,
    otherComments?: string | null,
  ): void {
    if (responseDescription !== undefined) this.responseDescription = responseDescription;
    if (systemResponse !== undefined) this.systemResponse = systemResponse;
    if (problemIdentified !== undefined) this.problemIdentified = problemIdentified;
    if (designSuggestion !== undefined) this.designSuggestion = designSuggestion;
    if (otherComments !== undefined) this.otherComments = otherComments;
    this.updatedAt = new Date();
  }

  // Métodos de análisis
  hasIssues(): boolean {
    return this.q1WillUserTryCorrectOutcome === CognitiveQuestionAnswer.NO ||
           this.q2WillUserNoticeAction === CognitiveQuestionAnswer.NO ||
           this.q3WillUserAssociateAction === CognitiveQuestionAnswer.NO ||
           this.q4WillUserSeeProgress === CognitiveQuestionAnswer.NO;
  }

  getIssueCount(): number {
    let count = 0;
    if (this.q1WillUserTryCorrectOutcome === CognitiveQuestionAnswer.NO) count++;
    if (this.q2WillUserNoticeAction === CognitiveQuestionAnswer.NO) count++;
    if (this.q3WillUserAssociateAction === CognitiveQuestionAnswer.NO) count++;
    if (this.q4WillUserSeeProgress === CognitiveQuestionAnswer.NO) count++;
    return count;
  }

  getAnswerSummary(): string {
    const answers = [
      this.q1WillUserTryCorrectOutcome,
      this.q2WillUserNoticeAction,
      this.q3WillUserAssociateAction,
      this.q4WillUserSeeProgress,
    ];
    const yesCount = answers.filter(a => a === CognitiveQuestionAnswer.YES).length;
    const noCount = answers.filter(a => a === CognitiveQuestionAnswer.NO).length;
    return `${yesCount} sí, ${noCount} no, ${4 - yesCount - noCount} incierto`;
  }

  isCompleted(): boolean {
    return this.status === CognitiveResponseStatus.COMPLETED;
  }

  isSkipped(): boolean {
    return this.status === CognitiveResponseStatus.SKIPPED;
  }

  isPending(): boolean {
    return this.status === CognitiveResponseStatus.PENDING;
  }
}