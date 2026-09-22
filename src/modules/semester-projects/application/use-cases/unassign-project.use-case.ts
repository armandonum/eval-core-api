// src/modules/semester-projects/application/use-cases/unassign-project.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ISemesterProjectRepository } from '../../domain/interfaces/semester-project-repository.interface';
import { UnassignProjectDto } from '../dtos/unassign-project.dto';

@Injectable()
export class UnassignProjectUseCase {
  constructor(
    @Inject('ISemesterProjectRepository')
    private readonly repository: ISemesterProjectRepository,
  ) {}

  async execute(dto: UnassignProjectDto): Promise<boolean> {
    const exists = await this.repository.exists(dto.semesterId, dto.projectId);
    if (!exists) {
      throw new NotFoundException(
        `El proyecto no está asignado a este semestre`,
      );
    }

    return this.repository.unassignByProjectAndSemester(dto.semesterId, dto.projectId);
  }
}