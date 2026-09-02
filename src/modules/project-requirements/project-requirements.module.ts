import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProjectRequirementsController } from './presentation/controllers/project-requirements.controller'

import { ProjectRequirementRepository } from './domain/interfaces/project-requirement.repository'

import { CreateProjectRequirementUseCase } from './application/use-cases/create-project-requirement.use-case'
import { DeleteProjectRequirementUseCase } from './application/use-cases/delete-project-requirement.use-case'
import { GetProjectRequirementUseCase } from './application/use-cases/get-project-requirement.use-case'
import { GetProjectRequirementsByProjectUseCase } from './application/use-cases/get-project-requirements-by-project.use-case'
import { GetProjectRequirementsUseCase } from './application/use-cases/get-project-requirements.use-case'
import { UpdateProjectRequirementUseCase } from './application/use-cases/update-project-requirement.use-case'
import { GetProjectRequirementsBySemesterUseCase } from './application/use-cases/get-project-requirement-by-semester.use-case'

import { ProjectRequirementRepositoryImpl } from './infrastructure/repositories/project-requirement.repository.impl'
import { ProjectRequirementTypeormEntity } from './infrastructure/typeorm/project-requirement.typeorm.entity'
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectRequirementTypeormEntity,
    ]),
  ],

  controllers: [
    ProjectRequirementsController,
  ],

  providers: [
    CreateProjectRequirementUseCase,
    UpdateProjectRequirementUseCase,
    DeleteProjectRequirementUseCase,
    GetProjectRequirementUseCase,
    GetProjectRequirementsUseCase,
    GetProjectRequirementsByProjectUseCase,
    GetProjectRequirementsBySemesterUseCase,

    {
      provide: INJECTION_TOKENS.PROJECT_REQUIREMENTS,
      useClass: ProjectRequirementRepositoryImpl,
    },
  ],

  exports: [
    CreateProjectRequirementUseCase,
    UpdateProjectRequirementUseCase,
    DeleteProjectRequirementUseCase,
    GetProjectRequirementUseCase,
    GetProjectRequirementsUseCase,
    GetProjectRequirementsByProjectUseCase,
    GetProjectRequirementsBySemesterUseCase,
  ],
})
export class ProjectRequirementsModule {}