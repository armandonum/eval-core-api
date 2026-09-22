import { HeuristicPrinciple } from '../../domain/entities/heuristic-principle.entity';
import { HeuristicPrincipleTypeorm } from './heuristic-principle.typeorm.entity';

export class HeuristicPrincipleMapper {
  static toDomain(typeorm: HeuristicPrincipleTypeorm): HeuristicPrinciple {
    return new HeuristicPrinciple(
      typeorm.principle_id,
      typeorm.framework_id,
      typeorm.code,
      typeorm.name,
      typeorm.description,
      typeorm.order_index,
      typeorm.is_active,
      typeorm.created_at,
      typeorm.updated_at,
    );
  }

  static toTypeorm(domain: HeuristicPrinciple): HeuristicPrincipleTypeorm {
    const typeorm = new HeuristicPrincipleTypeorm();
    if (domain.principleId) typeorm.principle_id = domain.principleId;
    typeorm.framework_id = domain.frameworkId;
    typeorm.code = domain.code;
    typeorm.name = domain.name;
    typeorm.description = domain.description;
    typeorm.order_index = domain.orderIndex;
    typeorm.is_active = domain.isActive;
    typeorm.created_at = domain.createdAt;
    typeorm.updated_at = domain.updatedAt;
    return typeorm;
  }
}