import { FlowClick } from '../../domain/entities/flow-click.entity';
import { FlowClickTypeormEntity } from './flow-click.typeorm.entity';

export class FlowClickMapper {

  static toDomain(
    entity: FlowClickTypeormEntity,
  ): FlowClick {
    return new FlowClick(
      entity.click_id,
      entity.flow_id,
      entity.order_index,
      entity.node_id,
      entity.presented_node_id ?? null,
      entity.clicked_at,
    );
  }

  static toPersistence(
    domain: FlowClick,
  ): FlowClickTypeormEntity {

    const entity = new FlowClickTypeormEntity();

    entity.click_id = domain.clickId;
    entity.flow_id = domain.flowId;
    entity.order_index = domain.orderIndex;
    entity.node_id = domain.nodeId;
    entity.presented_node_id = domain.presentedNodeId ?? undefined;
    entity.clicked_at = domain.clickedAt;

    return entity;
  }

  static toDomainList(
    entities: FlowClickTypeormEntity[],
  ): FlowClick[] {
    return entities.map(this.toDomain);
  }
}