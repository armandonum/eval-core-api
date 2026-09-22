// src/modules/semester-projects/application/use-cases/get-projects-with-details.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ISemesterProjectRepository } from '../../domain/interfaces/semester-project-repository.interface';

@Injectable()
export class GetProjectsWithDetailsUseCase {
  constructor(
    @Inject('ISemesterProjectRepository')
    private readonly repository: ISemesterProjectRepository,
  ) {}

  async execute(semesterId: string): Promise<any[]> {
    return this.repository.getProjectsWithDetails(semesterId);
  }
}