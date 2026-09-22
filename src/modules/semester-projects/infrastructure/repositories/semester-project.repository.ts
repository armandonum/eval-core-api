// src/modules/semester-projects/infrastructure/repositories/semester-project.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SemesterProjectEntity } from '../typeorm/semester-project.entity';
import { ISemesterProjectRepository } from '../../domain/interfaces/semester-project-repository.interface';
import { SemesterProject } from '../../domain/entities/semester-project.entity';

@Injectable()
export class SemesterProjectRepository implements ISemesterProjectRepository {
  constructor(
    @InjectRepository(SemesterProjectEntity)
    private readonly repository: Repository<SemesterProjectEntity>,
  ) {}

  async assign(data: { semesterId: string; projectId: string }): Promise<SemesterProject> {
    const entity = this.repository.create({
      semesterId: data.semesterId,
      projectId: data.projectId,
    });

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async unassign(semesterProjectId: string): Promise<boolean> {
    const result = await this.repository.delete({ semester_project_id: semesterProjectId });
    return result.affected > 0;
  }

  async unassignByProjectAndSemester(semesterId: string, projectId: string): Promise<boolean> {
    const result = await this.repository.delete({
      semesterId,
      projectId,
    });
    return result.affected > 0;
  }

  async findById(id: string): Promise<SemesterProject | null> {
    const entity = await this.repository.findOne({
      where: { semester_project_id: id },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async findBySemester(semesterId: string): Promise<SemesterProject[]> {
    const entities = await this.repository.find({
      where: { semesterId },
      order: { assignedAt: 'DESC' },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findByProject(projectId: string): Promise<SemesterProject[]> {
    const entities = await this.repository.find({
      where: { projectId },
      order: { assignedAt: 'DESC' },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findBySemesterAndProject(
    semesterId: string,
    projectId: string,
  ): Promise<SemesterProject | null> {
    const entity = await this.repository.findOne({
      where: { semesterId, projectId },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async bulkAssign(semesterId: string, projectIds: string[]): Promise<SemesterProject[]> {
    const entities = projectIds.map((projectId) =>
      this.repository.create({
        semesterId,
        projectId,
      }),
    );

    const saved = await this.repository.save(entities);
    return saved.map((e) => this.toDomain(e));
  }

  async exists(semesterId: string, projectId: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { semesterId, projectId },
    });
    return count > 0;
  }

  async countBySemester(semesterId: string): Promise<number> {
    return this.repository.count({
      where: { semesterId },
    });
  }

  async countByProject(projectId: string): Promise<number> {
    return this.repository.count({
      where: { projectId },
    });
  }
// En semester-project.repository.ts
async getProjectsWithDetails(semesterId: string): Promise<any[]> {
  const results = await this.repository.query(
    `
    SELECT 
      sp.semester_project_id AS "semesterProjectId",
      sp.semester_id AS "semesterId",
      sp.project_id AS "projectId",
      sp.assigned_at AS "assignedAt",
      p.project_name AS "projectName",
      p.file_key AS "projectFileKey",
      p.thumbnail_url AS "thumbnailUrl",
      p.version AS "version",
      p.last_modified AS "lastModified",
      s.name AS "semesterName",
      s.code AS "semesterCode"
    FROM public.semester_projects sp
    INNER JOIN usability.figma_projects p ON p.project_id = sp.project_id
    INNER JOIN public.semesters s ON s.semester_id = sp.semester_id
    WHERE sp.semester_id = $1
    ORDER BY p.project_name ASC
    `,
    [semesterId]
  );

  return results;
}

  private toDomain(entity: SemesterProjectEntity): SemesterProject {
    return new SemesterProject({
      semesterProjectId: entity.semester_project_id,
      semesterId: entity.semesterId,
      projectId: entity.projectId,
      assignedAt: entity.assignedAt,
    });
  }
}