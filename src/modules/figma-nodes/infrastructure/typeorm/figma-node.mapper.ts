import { FigmaNode } from '../../domain/entities/figma-node.entity';
import { FigmaNodeTypeormEntity } from './figma-node.typeorm.entity';

export class FigmaNodeMapper {

  static toDomain(
    orm: FigmaNodeTypeormEntity,
  ): FigmaNode {

    return new FigmaNode(
      orm.node_id,
      orm.project_id,
      orm.parent_node_id ?? '',
      orm.name,
      orm.type,
      orm.depth,
      orm.is_screen,
      orm.component_id ?? '',
      orm.position_x,
      orm.position_y,
      orm.width,
      orm.height,
      orm.raw_json,
      orm.created_at,
      orm.updated_at,
    );
  }

  static toPersistence(
    domain: FigmaNode,
  ): FigmaNodeTypeormEntity {

    const orm = new FigmaNodeTypeormEntity();

    orm.node_id = domain.nodeId;
    orm.project_id = domain.projectId;
    orm.parent_node_id = domain.parentNodeId ?? undefined;
    orm.name = domain.name;
    orm.type = domain.type;
    orm.depth = domain.depth;
    orm.is_screen = domain.isScreen;
    orm.component_id = domain.componentId ?? undefined;
    orm.position_x = domain.positionX ?? 0;
    orm.position_y = domain.positionY ?? 0;
    orm.width = domain.width ?? 0;
    orm.height = domain.height ?? 0;
    orm.raw_json = domain.rawJson;
    orm.created_at = domain.createdAt;
    orm.updated_at = domain.updatedAt;

    return orm;
  }

  static toDomainList(
    entities: FigmaNodeTypeormEntity[],
  ): FigmaNode[] {
    return entities.map(this.toDomain);
  }
}