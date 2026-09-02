// src/modules/semester-projects/application/use-cases/get-projects-by-semester.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ISemesterProjectRepository } from '../../domain/interfaces/semester-project-repository.interface';
import { SemesterProject } from '../../domain/entities/semester-project.entity';

@Injectable()
export class GetProjectsBySemesterUseCase {
  constructor(
    @Inject('ISemesterProjectRepository')
    private readonly repository: ISemesterProjectRepository,
  ) {}

  async execute(semesterId: string): Promise<SemesterProject[]> {
    return this.repository.findBySemester(semesterId);
  }
}