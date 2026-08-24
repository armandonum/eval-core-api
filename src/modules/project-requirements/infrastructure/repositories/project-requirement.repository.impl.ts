import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { ProjectRequirement } from '../../domain/entities/project-requirement.entity'
import { ProjectRequirementRepository } from '../../domain/interfaces/project-requirement.repository'

import { ProjectRequirementMapper } from '../typeorm/project-requirement.mapper'
import { ProjectRequirementTypeormEntity } from '../typeorm/project-requirement.typeorm.entity'

@Injectable()
export class ProjectRequirementRepositoryImpl
  implements ProjectRequirementRepository
{
  constructor(
    @InjectRepository(ProjectRequirementTypeormEntity)
    private readonly repository: Repository<ProjectRequirementTypeormEntity>,
  ) {}

  async create(
    requirement: ProjectRequirement,
  ): Promise<ProjectRequirement> {
    const entity = ProjectRequirementMapper.toPersistence(requirement)

    const saved = await this.repository.save(entity)

    return ProjectRequirementMapper.toDomain(saved)
  }

  async update(
    requirement: ProjectRequirement,
  ): Promise<ProjectRequirement> {
    const entity = ProjectRequirementMapper.toPersistence(requirement)

    const updated = await this.repository.save(entity)

    return ProjectRequirementMapper.toDomain(updated)
  }

  async delete(
    requirementId: string,
  ): Promise<void> {
    await this.repository.delete(requirementId)
  }

  async findById(
    requirementId: string,
  ): Promise<ProjectRequirement | null> {
    const entity = await this.repository.findOne({
      where: {
        requirementId,
      },
    })

    if (!entity) {
      return null
    }

    return ProjectRequirementMapper.toDomain(entity)
  }

  async findAll(): Promise<ProjectRequirement[]> {
    const entities = await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    })

    return entities.map(ProjectRequirementMapper.toDomain)
  }

  async findByProject(
    projectId: string,
  ): Promise<ProjectRequirement[]> {
    const entities = await this.repository.find({
      where: {
        projectId,
      },
      order: {
        code: 'ASC',
      },
    })

    return entities.map(ProjectRequirementMapper.toDomain)
  }

  async existsByCode(
    projectId: string,
    code: string,
  ): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        projectId,
        code,
      },
    })

    return count > 0
  }
}