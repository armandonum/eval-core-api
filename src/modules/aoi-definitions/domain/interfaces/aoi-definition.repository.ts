import { AoiDefinition } from '../entities/aoi-definition.entity';

export interface AoiDefinitionRepository {
  create(aoi: AoiDefinition): Promise<AoiDefinition>;
  createBatch(aois: AoiDefinition[]): Promise<AoiDefinition[]>;
  findAll(): Promise<AoiDefinition[]>;
  findById(id: string): Promise<AoiDefinition | null>;
  findByProject(projectId: string): Promise<AoiDefinition[]>;
  findByTask(taskId: string): Promise<AoiDefinition[]>;
  findByNameAndProject(name: string, projectId: string): Promise<AoiDefinition | null>;
  update(id: string, aoi: Partial<AoiDefinition>): Promise<AoiDefinition>;
  delete(id: string): Promise<void>;
  deleteByProject(projectId: string): Promise<void>;
  countByProject(projectId: string): Promise<number>;
}

export const AOI_DEFINITION_REPOSITORY = 'AOI_DEFINITION_REPOSITORY';