// src/modules/semester-projects/application/use-cases/bulk-assign-projects.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ISemesterProjectRepository } from '../../domain/interfaces/semester-project-repository.interface';
import { BulkAssignProjectsDto } from '../dtos/bulk-assign-projects.dto';
import { SemesterProject } from '../../domain/entities/semester-project.entity';

@Injectable()
export class BulkAssignProjectsUseCase {
  constructor(
    @Inject('ISemesterProjectRepository')
    private readonly repository: ISemesterProjectRepository,
  ) {}

  async execute(dto: BulkAssignProjectsDto): Promise<SemesterProject[]> {
    const assignments = await this.repository.bulkAssign(
      dto.semesterId,
      dto.projectIds,
    );

    return assignments;
  }
}