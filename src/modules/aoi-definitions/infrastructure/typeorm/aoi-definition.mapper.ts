import { AoiDefinition, AoiType } from '../../domain/entities/aoi-definition.entity';
import { AoiDefinitionTypeorm } from './aoi-definition.typeorm.entity';

export class AoiDefinitionMapper {
  static toDomain(typeorm: AoiDefinitionTypeorm): AoiDefinition {
    return new AoiDefinition(
      typeorm.aoi_id,
      typeorm.project_id,
      typeorm.task_id,
      typeorm.name,
      typeorm.description,
      Number(typeorm.x1),
      Number(typeorm.y1),
      Number(typeorm.x2),
      Number(typeorm.y2),
      typeorm.node_id,
      typeorm.aoi_type as AoiType,
      typeorm.created_by,
      typeorm.created_at,
      typeorm.updated_at,
    );
  }

  static toTypeorm(domain: AoiDefinition): AoiDefinitionTypeorm {
    const typeorm = new AoiDefinitionTypeorm();
    if (domain.aoiId) typeorm.aoi_id = domain.aoiId;
    typeorm.project_id = domain.projectId;
    typeorm.task_id = domain.taskId;
    typeorm.name = domain.name;
    typeorm.description = domain.description;
    typeorm.x1 = domain.x1;
    typeorm.y1 = domain.y1;
    typeorm.x2 = domain.x2;
    typeorm.y2 = domain.y2;
    typeorm.node_id = domain.nodeId;
    typeorm.aoi_type = domain.aoiType;
    typeorm.created_by = domain.createdBy;
    typeorm.created_at = domain.createdAt;
    typeorm.updated_at = domain.updatedAt;
    return typeorm;
  }
}