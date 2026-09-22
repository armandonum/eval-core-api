import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FigmaProjectRepository } from '../../domain/interfaces/figma-project.repository';
import { FigmaProject } from '../../domain/entities/figma-project.entity';

import { FigmaProjectMapper } from '../typeorm/figma-project.mapper';
import { FigmaProjectTypeormEntity } from '../typeorm/figma-project.typeorm.entity';

@Injectable()
export class FigmaProjectRepositoryImpl
  implements FigmaProjectRepository
{
  constructor(
    @InjectRepository(FigmaProjectTypeormEntity)
    private readonly repository: Repository<FigmaProjectTypeormEntity>,
  ) {}

  async create(
    project: FigmaProject,
  ): Promise<FigmaProject> {
    const persistence =
      FigmaProjectMapper.toPersistence(project);

    const saved =
      await this.repository.save(persistence);

    return FigmaProjectMapper.toDomain(saved);
  }

  async update(
    project: FigmaProject,
  ): Promise<FigmaProject> {
    const persistence =
      FigmaProjectMapper.toPersistence(project);

    await this.repository.update(
      {
        project_id: project.projectId,
      },
      persistence,
    );

    const updated = await this.findById(
      project.projectId,
    );

    if (!updated) {
      throw new Error('Project not found');
    }

    return updated;
  }

  async delete(
    projectId: string,
  ): Promise<void> {
    await this.repository.delete({
      project_id: projectId,
    });
  }

  async findById(
    projectId: string,
  ): Promise<FigmaProject | null> {
    const orm =
      await this.repository.findOne({
        where: {
          project_id: projectId,
        },
      });

    if (!orm) {
      return null;
    }

    return FigmaProjectMapper.toDomain(orm);
  }

    async findByCreator(
    created_by: string,
  ): Promise<FigmaProject[] | null> {
    const orm =
      await this.repository.find({
        where: {
          created_by: created_by,
        },
      });

    if (!orm) {
      return null;
    }

    return orm.map(FigmaProjectMapper.toDomain)
  }

  async findByFileKey(
    fileKey: string,
  ): Promise<FigmaProject | null> {
    const orm =
      await this.repository.findOne({
        where: {
          file_key: fileKey,
        },
      });

    if (!orm) {
      return null;
    }

    return FigmaProjectMapper.toDomain(orm);
  }

  async findAll(): Promise<FigmaProject[]> {
    const orms =
      await this.repository.find({
        order: {
          created_at: 'DESC',
        },
      });

    return FigmaProjectMapper.toDomainList(orms);
  }
}