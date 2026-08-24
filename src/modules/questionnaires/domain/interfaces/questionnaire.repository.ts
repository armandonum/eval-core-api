import { Questionnaire } from '../entities/questionnaire.entity';

export interface QuestionnaireRepository {
  create(
    questionnaire: Questionnaire,
  ): Promise<Questionnaire>;

  update(
    questionnaire: Questionnaire,
  ): Promise<Questionnaire>;

  delete(
    questionnaireId: string,
  ): Promise<void>;

  findById(
    questionnaireId: string,
  ): Promise<Questionnaire | null>;

  findByProjectId(
    projectId: string,
  ): Promise<Questionnaire[]>;

  findAll(): Promise<Questionnaire[]>;

  findByProjectAndType(
    projectId: string,
    type: string,
  ): Promise<Questionnaire | null>;

  // findByProjectIdAndType(projectId: string, type: 'pretest' | 'posttest'): Promise<Questionnaire | null>
}
