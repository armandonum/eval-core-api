// src/modules/semester-projects/application/use-cases/get-semesters-by-project.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ISemesterProjectRepository } from '../../domain/interfaces/semester-project-repository.interface';
import { SemesterProject } from '../../domain/entities/semester-project.entity';

@Injectable()
export class GetSemestersByProjectUseCase {
  constructor(
    @Inject('ISemesterProjectRepository')
    private readonly repository: ISemesterProjectRepository,
  ) {}

  async execute(projectId: string): Promise<SemesterProject[]> {
    return this.repository.findByProject(projectId);
  }
}