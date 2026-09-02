// src/modules/semester-students/application/use-cases/assign-student.use-case.ts
import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { ISemesterStudentRepository } from '../../domain/interfaces/semester-student-repository.interface';
import { AssignStudentDto } from '../dtos/assign-student.dto';
import { SemesterStudent } from '../../domain/entities/semester-student.entity';

@Injectable()
export class AssignStudentUseCase {
  constructor(
    @Inject('ISemesterStudentRepository')
    private readonly repository: ISemesterStudentRepository,
  ) {}

  async execute(dto: AssignStudentDto): Promise<SemesterStudent> {
    // Verificar si ya está asignado
    const exists = await this.repository.exists(dto.semesterId, dto.userId);
    if (exists) {
      throw new ConflictException(
        `El estudiante ya está asignado a este semestre`,
      );
    }

    const assignment = await this.repository.assign({
      semesterId: dto.semesterId,
      userId: dto.userId,
    });

    return assignment;
  }
}