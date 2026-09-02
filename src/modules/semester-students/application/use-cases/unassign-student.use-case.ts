// src/modules/semester-students/application/use-cases/unassign-student.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ISemesterStudentRepository } from '../../domain/interfaces/semester-student-repository.interface';
import { UnassignStudentDto } from '../dtos/unassign-student.dto';

@Injectable()
export class UnassignStudentUseCase {
  constructor(
    @Inject('ISemesterStudentRepository')
    private readonly repository: ISemesterStudentRepository,
  ) {}

  async execute(dto: UnassignStudentDto): Promise<boolean> {
    const exists = await this.repository.exists(dto.semesterId, dto.userId);
    if (!exists) {
      throw new NotFoundException(
        `El estudiante no está asignado a este semestre`,
      );
    }

    return this.repository.unassignByUserAndSemester(dto.semesterId, dto.userId);
  }
}