// src/modules/semester-projects/semester-projects.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SemesterProjectController } from './presentation/controllers/semester-project.controller';
import { SemesterProjectRepository } from './infrastructure/repositories/semester-project.repository';
import { SemesterProjectEntity } from './infrastructure/typeorm/semester-project.entity';

import { AssignProjectUseCase } from './application/use-cases/assign-project.use-case';
import { UnassignProjectUseCase } from './application/use-cases/unassign-project.use-case';
import { GetProjectsBySemesterUseCase } from './application/use-cases/get-projects-by-semester.use-case';
import { GetProjectsWithDetailsUseCase } from './application/use-cases/get-projects-with-details.use-case';
import { GetSemestersByProjectUseCase } from './application/use-cases/get-semesters-by-project.use-case';
import { BulkAssignProjectsUseCase } from './application/use-cases/bulk-assign-projects.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SemesterProjectEntity])],
  controllers: [SemesterProjectController],
  providers: [
    // Repositories
    {
      provide: 'ISemesterProjectRepository',
      useClass: SemesterProjectRepository,
    },
    // Use Cases
    AssignProjectUseCase,
    UnassignProjectUseCase,
    GetProjectsBySemesterUseCase,
    GetProjectsWithDetailsUseCase,
    GetSemestersByProjectUseCase,
    BulkAssignProjectsUseCase,
  ],
  exports: [
    'ISemesterProjectRepository',
    GetProjectsBySemesterUseCase,
    GetSemestersByProjectUseCase,
  ],
})
export class SemesterProjectsModule {}