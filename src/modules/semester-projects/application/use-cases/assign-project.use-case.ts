// src/modules/semester-projects/application/use-cases/assign-project.use-case.ts
import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { ISemesterProjectRepository } from '../../domain/interfaces/semester-project-repository.interface';
import { AssignProjectDto } from '../dtos/assign-project.dto';
import { SemesterProject } from '../../domain/entities/semester-project.entity';

@Injectable()
export class AssignProjectUseCase {
  constructor(
    @Inject('ISemesterProjectRepository')
    private readonly repository: ISemesterProjectRepository,
  ) {}

  async execute(dto: AssignProjectDto): Promise<SemesterProject> {
    // Verificar si ya está asignado
    const exists = await this.repository.exists(dto.semesterId, dto.projectId);
    if (exists) {
      throw new ConflictException(
        `El proyecto ya está asignado a este semestre`,
      );
    }

    const assignment = await this.repository.assign({
      semesterId: dto.semesterId,
      projectId: dto.projectId,
    });

    return assignment;
  }
}