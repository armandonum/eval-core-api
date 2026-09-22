// src/modules/semesters/semesters.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SemesterController } from './presentation/controllers/semester.controller';
import { SemesterRepository } from './infrastructure/repositories/semester.repository.impl';
import { SemesterTypeOrmEntity } from './infrastructure/typeorm/semester.typeorm.entity';

import { CreateSemesterUseCase } from './application/use-cases/create-semester.use-case';
import { GetSemestersUseCase } from './application/use-cases/get-semesters.use-case';
import { GetSemesterByIdUseCase } from './application/use-cases/get-semester-by-id.use-case';
import { UpdateSemesterUseCase } from './application/use-cases/update-semester.use-case';
import { DeleteSemesterUseCase } from './application/use-cases/delete-semester.use-case';
import { GetActiveSemesterUseCase } from './application/use-cases/get-active-semester.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SemesterTypeOrmEntity])],
  controllers: [SemesterController],
  providers: [
    // Repositories
    {
      provide: 'ISemesterRepository',
      useClass: SemesterRepository,
    },
    // Use Cases
    CreateSemesterUseCase,
    GetSemestersUseCase,
    GetSemesterByIdUseCase,
    UpdateSemesterUseCase,
    DeleteSemesterUseCase,
    GetActiveSemesterUseCase,
  ],
  exports: [
    'ISemesterRepository',
    GetActiveSemesterUseCase,
    GetSemesterByIdUseCase,
  ],
})
export class SemestersModule {}