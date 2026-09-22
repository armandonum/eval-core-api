import { FigmaNode } from '../entities/figma-node.entity';

export interface FigmaNodeRepository {

  create(
    node: FigmaNode,
  ): Promise<FigmaNode>;

  update(
    node: FigmaNode,
  ): Promise<FigmaNode>;

  delete(
    nodeId: string,
  ): Promise<void>;

  findById(
    nodeId: string,
  ): Promise<FigmaNode | null>;

  findAll(): Promise<FigmaNode[]>;

  findByProject(
    projectId: string,
  ): Promise<FigmaNode[]>;

  findChildren(
    parentNodeId: string,
  ): Promise<FigmaNode[]>;

  findScreens(
    projectId: string,
  ): Promise<FigmaNode[]>;
}