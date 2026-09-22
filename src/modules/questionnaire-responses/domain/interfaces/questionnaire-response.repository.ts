import { QuestionnaireResponse } from '../entities/questionnaire-response.entity';

export interface QuestionnaireResponseRepository {

  create(
    response: QuestionnaireResponse,
  ): Promise<QuestionnaireResponse>;

  update(
    response: QuestionnaireResponse,
  ): Promise<QuestionnaireResponse>;

  delete(
    responseId: string,
  ): Promise<void>;

  findById(
    responseId: string,
  ): Promise<QuestionnaireResponse | null>;

  findAll(): Promise<QuestionnaireResponse[]>;

  findByQuestionnaireId(
    questionnaireId: string,
  ): Promise<QuestionnaireResponse[]>;

  findByParticipantId(
    participantId: string,
  ): Promise<QuestionnaireResponse[]>;

  findByQuestionnaireParticipantSession(
    questionnaireId: string,
    participantId: string,
    sessionId: string | null,
  ): Promise<QuestionnaireResponse | null>;
}