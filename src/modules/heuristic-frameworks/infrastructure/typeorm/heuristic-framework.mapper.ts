import { HeuristicFramework } from '../../domain/entities/heuristic-framework.entity';
import { HeuristicFrameworkTypeorm } from './heuristic-framework.typeorm.entity';

export class HeuristicFrameworkMapper {
  static toDomain(typeorm: HeuristicFrameworkTypeorm): HeuristicFramework {
    return new HeuristicFramework(
      typeorm.framework_id,
      typeorm.name,
      typeorm.description,
      typeorm.author,
      typeorm.year,
      typeorm.is_active,
      typeorm.created_at,
      typeorm.updated_at,
    );
  }

  static toTypeorm(domain: HeuristicFramework): HeuristicFrameworkTypeorm {
    const typeorm = new HeuristicFrameworkTypeorm();
    if (domain.frameworkId) typeorm.framework_id = domain.frameworkId;
    typeorm.name = domain.name;
    typeorm.description = domain.description;
    typeorm.author = domain.author;
    typeorm.year = domain.year;
    typeorm.is_active = domain.isActive;
    typeorm.created_at = domain.createdAt;
    typeorm.updated_at = domain.updatedAt;
    return typeorm;
  }
}