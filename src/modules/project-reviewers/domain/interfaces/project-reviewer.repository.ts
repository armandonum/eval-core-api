import { ProjectReviewer } from '../entities/project-reviewer.entity';

export interface ProjectReviewerRepository {

  create(
    reviewer: ProjectReviewer,
  ): Promise<ProjectReviewer>;

  update(
    reviewer: ProjectReviewer,
  ): Promise<ProjectReviewer>;

  delete(
    projectReviewerId: string,
  ): Promise<void>;

  findById(
    projectReviewerId: string,
  ): Promise<ProjectReviewer | null>;

  findByProjectId(
    projectId: string,
  ): Promise<ProjectReviewer[]>;

  findByUserId(
    userId: string,
  ): Promise<ProjectReviewer[]>;

  findByProjectAndUser(
    projectId: string,
    userId: string,
  ): Promise<ProjectReviewer | null>;

  findAll(): Promise<ProjectReviewer[]>;
}