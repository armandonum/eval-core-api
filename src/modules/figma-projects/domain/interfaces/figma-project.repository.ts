import { FigmaProject } from '../entities/figma-project.entity';

export interface FigmaProjectRepository {

  create(
    project: FigmaProject,
  ): Promise<FigmaProject>;

  update(
    project: FigmaProject,
  ): Promise<FigmaProject>;

  delete(
    projectId: string,
  ): Promise<void>;

  findById(
    projectId: string,
  ): Promise<FigmaProject | null>;

  findByFileKey(
    fileKey: string,
  ): Promise<FigmaProject | null>;

  findAll(): Promise<FigmaProject[]>;

  findByCreator(
    created_by: string,
  ): Promise<FigmaProject[] | null>;
}