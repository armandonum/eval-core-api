import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AoiDefinitionRepository } from '../../domain/interfaces/aoi-definition.repository';
import { AoiDefinition } from '../../domain/entities/aoi-definition.entity';
import { AoiDefinitionTypeorm } from '../typeorm/aoi-definition.typeorm.entity';
import { AoiDefinitionMapper } from '../typeorm/aoi-definition.mapper';

@Injectable()
export class AoiDefinitionRepositoryImpl implements AoiDefinitionRepository {
  constructor(
    @InjectRepository(AoiDefinitionTypeorm)
    private readonly repository: Repository<AoiDefinitionTypeorm>,
  ) {}

  async create(aoi: AoiDefinition): Promise<AoiDefinition> {
    const typeorm = AoiDefinitionMapper.toTypeorm(aoi);
    const saved = await this.repository.save(typeorm);
    return AoiDefinitionMapper.toDomain(saved);
  }

  async createBatch(aois: AoiDefinition[]): Promise<AoiDefinition[]> {
    const typeorms = aois.map(AoiDefinitionMapper.toTypeorm);
    const saved = await this.repository.save(typeorms);
    return saved.map(AoiDefinitionMapper.toDomain);
  }

  async findAll(): Promise<AoiDefinition[]> {
    const aois = await this.repository.find({
      order: { created_at: 'DESC' },
    });
    return aois.map(AoiDefinitionMapper.toDomain);
  }

  async findById(id: string): Promise<AoiDefinition | null> {
    const aoi = await this.repository.findOne({ where: { aoi_id: id } });
    return aoi ? AoiDefinitionMapper.toDomain(aoi) : null;
  }

  async findByProject(projectId: string): Promise<AoiDefinition[]> {
    const aois = await this.repository.find({
      where: { project_id: projectId },
      order: { name: 'ASC' },
    });
    return aois.map(AoiDefinitionMapper.toDomain);
  }

  async findByTask(taskId: string): Promise<AoiDefinition[]> {
    const aois = await this.repository.find({
      where: { task_id: taskId },
      order: { name: 'ASC' },
    });
    return aois.map(AoiDefinitionMapper.toDomain);
  }

  async findByNameAndProject(
    name: string,
    projectId: string,
  ): Promise<AoiDefinition | null> {
    const aoi = await this.repository.findOne({
      where: { name, project_id: projectId },
    });
    return aoi ? AoiDefinitionMapper.toDomain(aoi) : null;
  }

  async update(id: string, aoi: Partial<AoiDefinition>): Promise<AoiDefinition> {
    await this.repository.update(id, {
      name: aoi.name,
      description: aoi.description,
      x1: aoi.x1,
      y1: aoi.y1,
      x2: aoi.x2,
      y2: aoi.y2,
      node_id: aoi.nodeId,
      aoi_type: aoi.aoiType,
      task_id: aoi.taskId,
      updated_at: new Date(),
    });
    const updated = await this.repository.findOne({ where: { aoi_id: id } });
    return AoiDefinitionMapper.toDomain(updated!);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByProject(projectId: string): Promise<void> {
    await this.repository.delete({ project_id: projectId });
  }

  async countByProject(projectId: string): Promise<number> {
    return this.repository.count({ where: { project_id: projectId } });
  }
}