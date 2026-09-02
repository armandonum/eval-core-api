// src/modules/semester-students/application/use-cases/get-students-with-details.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ISemesterStudentRepository } from '../../domain/interfaces/semester-student-repository.interface';

@Injectable()
export class GetStudentsWithDetailsUseCase {
  constructor(
    @Inject('ISemesterStudentRepository')
    private readonly repository: ISemesterStudentRepository,
  ) {}

  async execute(semesterId: string): Promise<any[]> {
    return this.repository.getStudentsWithDetails(semesterId);
  }
}