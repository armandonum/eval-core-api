import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProjectReviewerRepository } from '../../domain/interfaces/project-reviewer.repository';
import { ProjectReviewer } from '../../domain/entities/project-reviewer.entity';

import { ProjectReviewerMapper } from '../typeorm/project-reviewer.mapper';
import { ProjectReviewerTypeormEntity } from '../typeorm/project-reviewer.typeorm.entity';

@Injectable()
export class ProjectReviewerRepositoryImpl
  implements ProjectReviewerRepository
{
  constructor(
    @InjectRepository(ProjectReviewerTypeormEntity)
    private readonly repository: Repository<ProjectReviewerTypeormEntity>,
  ) {}

  async create(
    reviewer: ProjectReviewer,
  ): Promise<ProjectReviewer> {
    const persistence =
      ProjectReviewerMapper.toPersistence(reviewer);

    const saved =
      await this.repository.save(persistence);

    return ProjectReviewerMapper.toDomain(saved);
  }

  async update(
    reviewer: ProjectReviewer,
  ): Promise<ProjectReviewer> {
    await this.repository.update(
      {
        project_reviewer_id: reviewer.projectReviewerId,
      },
      ProjectReviewerMapper.toPersistence(reviewer),
    );

    return (
      await this.findById(reviewer.projectReviewerId)
    )!;
  }

  async delete(
    projectReviewerId: string,
  ): Promise<void> {
    await this.repository.delete({
      project_reviewer_id: projectReviewerId,
    });
  }

  async findById(
    projectReviewerId: string,
  ): Promise<ProjectReviewer | null> {
    const orm =
      await this.repository.findOne({
        where: {
          project_reviewer_id: projectReviewerId,
        },
      });

    if (!orm) {
      return null;
    }

    return ProjectReviewerMapper.toDomain(orm);
  }

  async findByProjectId(
    projectId: string,
  ): Promise<ProjectReviewer[]> {
    const list =
      await this.repository.find({
        where: {
          project_id: projectId,
        },
        order: {
          assigned_at: 'ASC',
        },
      });

    return ProjectReviewerMapper.toDomainList(list);
  }

  async findByUserId(
    userId: string,
  ): Promise<ProjectReviewer[]> {
    const list =
      await this.repository.find({
        where: {
          user_id: userId,
        },
        order: {
          assigned_at: 'ASC',
        },
      });

    return ProjectReviewerMapper.toDomainList(list);
  }

  async findAll(): Promise<ProjectReviewer[]> {
    const list =
      await this.repository.find({
        order: {
          assigned_at: 'ASC',
        },
      });

    return ProjectReviewerMapper.toDomainList(list);
  }

  async findByProjectAndUser(
    projectId: string,
    userId: string,
  ): Promise<ProjectReviewer | null> {
    const orm =
      await this.repository.findOne({
        where: {
          project_id: projectId,
          user_id: userId,
        },
      });

    if (!orm) {
      return null;
    }

    return ProjectReviewerMapper.toDomain(orm);
  }
}