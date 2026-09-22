import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FigmaNodeRepository } from '../../domain/interfaces/figma-node.repository';
import { FigmaNode } from '../../domain/entities/figma-node.entity';
import { FigmaNodeMapper } from '../typeorm/figma-node.mapper';
import { FigmaNodeTypeormEntity } from '../typeorm/figma-node.typeorm.entity';

@Injectable()
export class FigmaNodeRepositoryImpl implements FigmaNodeRepository {
  constructor(
    @InjectRepository(FigmaNodeTypeormEntity)
    private readonly repository: Repository<FigmaNodeTypeormEntity>,
  ) {}

  async create(node: FigmaNode): Promise<FigmaNode> {
    const entity = FigmaNodeMapper.toPersistence(node);
    const saved = await this.repository.save(entity);
    return FigmaNodeMapper.toDomain(saved);
  }

  async findById(nodeId: string): Promise<FigmaNode | null> {
    const orm = await this.repository.findOne({
      where: {
        node_id: nodeId, 
      } as any, 
    });

    return orm ? FigmaNodeMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<FigmaNode[]> {
    const entities = await this.repository.find({
      order: {
        name: 'ASC',
      } as any,
    });

    return FigmaNodeMapper.toDomainList(entities);
  }

  async update(node: FigmaNode): Promise<FigmaNode> {
    const entity = FigmaNodeMapper.toPersistence(node);

    await this.repository.update(
      {
        node_id: node.nodeId,
      } as any,
      entity as any,
    );

    const updated = await this.findById(node.nodeId);

    if (!updated) {
      throw new NotFoundException(`Figma Node with ID ${node.nodeId} not found`);
    }

    return updated;
  }

  async delete(nodeId: string): Promise<void> {
    await this.repository.delete({
      node_id: nodeId,
    } as any);
  }



  async findByProject(projectId: string): Promise<FigmaNode[]> {
    const entities = await this.repository.find({
      where: {
        project_id: projectId,
      } as any,
    });

    return FigmaNodeMapper.toDomainList(entities);
  }

  async findChildren(parentNodeId: string): Promise<FigmaNode[]> {
    const entities = await this.repository.find({
      where: {
        parent_node_id: parentNodeId,
      } as any,
    });

    return FigmaNodeMapper.toDomainList(entities);
  }

  async findScreens(projectId: string): Promise<FigmaNode[]> {
    const entities = await this.repository.find({
      where: {
        project_id: projectId,
        type: 'FRAME', 
      } as any,
    });

    return FigmaNodeMapper.toDomainList(entities);
  }
}