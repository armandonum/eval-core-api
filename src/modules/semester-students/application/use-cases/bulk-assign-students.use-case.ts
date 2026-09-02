// src/modules/semester-students/application/use-cases/bulk-assign-students.use-case.ts
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ISemesterStudentRepository } from '../../domain/interfaces/semester-student-repository.interface';
import { BulkAssignStudentsDto } from '../dtos/bulk-assign-students.dto';
import { SemesterStudent } from '../../domain/entities/semester-student.entity';

@Injectable()
export class BulkAssignStudentsUseCase {
  constructor(
    @Inject('ISemesterStudentRepository')
    private readonly repository: ISemesterStudentRepository,
  ) {}

  async execute(dto: BulkAssignStudentsDto): Promise<SemesterStudent[]> {
    // Verificar que todos los estudiantes existan y estén disponibles
    // Esto se podría hacer con un servicio de usuarios
    
    const assignments = await this.repository.bulkAssign(
      dto.semesterId,
      dto.userIds,
    );

    return assignments;
  }
}