// src/modules/semester-students/semester-students.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SemesterStudentController } from './presentation/controllers/semester-student.controller';
import { SemesterStudentRepository } from './infrastructure/repositories/semester-student.repository';
import { SemesterStudentEntity } from './infrastructure/typeorm/semester-student.entity';

import { AssignStudentUseCase } from './application/use-cases/assign-student.use-case';
import { UnassignStudentUseCase } from './application/use-cases/unassign-student.use-case';
import { GetStudentsBySemesterUseCase } from './application/use-cases/get-students-by-semester.use-case';
import { GetStudentsWithDetailsUseCase } from './application/use-cases/get-students-with-details.use-case';
import { GetSemestersByStudentUseCase } from './application/use-cases/get-semesters-by-student.use-case';
import { BulkAssignStudentsUseCase } from './application/use-cases/bulk-assign-students.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SemesterStudentEntity])],
  controllers: [SemesterStudentController],
  providers: [
    // Repositories
    {
      provide: 'ISemesterStudentRepository',
      useClass: SemesterStudentRepository,
    },
    // Use Cases
    AssignStudentUseCase,
    UnassignStudentUseCase,
    GetStudentsBySemesterUseCase,
    GetStudentsWithDetailsUseCase,
    GetSemestersByStudentUseCase,
    BulkAssignStudentsUseCase,
  ],
  exports: [
    'ISemesterStudentRepository',
    GetStudentsBySemesterUseCase,
    GetSemestersByStudentUseCase,
  ],
})
export class SemesterStudentsModule {}