import { FlowClick } from '../entities/flow-click.entity';

export interface FlowClickRepository {

  create(
    click: FlowClick,
  ): Promise<FlowClick>;

  findById(
    clickId: string,
  ): Promise<FlowClick | null>;

  findAll(): Promise<FlowClick[]>;

  findByFlowId(
    flowId: string,
  ): Promise<FlowClick[]>;

  update(
    click: FlowClick,
  ): Promise<FlowClick>;

  delete(
    clickId: string,
  ): Promise<void>;

}