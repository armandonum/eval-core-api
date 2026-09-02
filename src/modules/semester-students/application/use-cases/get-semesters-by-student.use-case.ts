// src/modules/semester-students/application/use-cases/get-semesters-by-student.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ISemesterStudentRepository } from '../../domain/interfaces/semester-student-repository.interface';
import { SemesterStudent } from '../../domain/entities/semester-student.entity';

@Injectable()
export class GetSemestersByStudentUseCase {
  constructor(
    @Inject('ISemesterStudentRepository')
    private readonly repository: ISemesterStudentRepository,
  ) {}

  async execute(userId: string): Promise<SemesterStudent[]> {
    return this.repository.findByStudent(userId);
  }
}