// src/modules/semester-students/application/use-cases/get-students-by-semester.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ISemesterStudentRepository } from '../../domain/interfaces/semester-student-repository.interface';
import { SemesterStudent } from '../../domain/entities/semester-student.entity';

@Injectable()
export class GetStudentsBySemesterUseCase {
  constructor(
    @Inject('ISemesterStudentRepository')
    private readonly repository: ISemesterStudentRepository,
  ) {}

  async execute(semesterId: string): Promise<SemesterStudent[]> {
    return this.repository.findBySemester(semesterId);
  }
}