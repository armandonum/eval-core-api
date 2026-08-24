import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectReviewerController } from './presentation/controllers/project-reviewer.controller';

import { ProjectReviewerTypeormEntity } from './infrastructure/typeorm/project-reviewer.typeorm.entity';

import { ProjectReviewerRepositoryImpl } from './infrastructure/repositories/project-reviewer.repository.impl';

import { CreateProjectReviewerUseCase } from './application/use-cases/create-project-reviewer.use-case';
import { UpdateProjectReviewerUseCase } from './application/use-cases/update-project-reviewer.use-case';
import { DeleteProjectReviewerUseCase } from './application/use-cases/delete-project-reviewer.use-case';
import { FindProjectReviewerUseCase } from './application/use-cases/find-project-reviewer.use-case';
import { FindAllProjectReviewersUseCase } from './application/use-cases/find-all-project-reviewers.use-case';
import { FindProjectReviewersByProjectUseCase } from './application/use-cases/find-project-reviewers-by-project.use-case';
import { FindProjectReviewersByUserUseCase } from './application/use-cases/find-project-reviewers-by-user.use-case';

import { INJECTION_TOKENS } from './../../shared/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectReviewerTypeormEntity,
    ]),
  ],

  controllers: [
    ProjectReviewerController,
  ],

  providers: [
    {
      provide: INJECTION_TOKENS.PROJECT_REVIEWER_REPOSITORY,
      useClass: ProjectReviewerRepositoryImpl,
    },

    // CRUD
    CreateProjectReviewerUseCase,
    UpdateProjectReviewerUseCase,
    DeleteProjectReviewerUseCase,
    FindProjectReviewerUseCase,
    FindAllProjectReviewersUseCase, 

    // Consultas
    FindProjectReviewersByProjectUseCase,
    FindProjectReviewersByUserUseCase,
  ],

  exports: [
    {
      provide: INJECTION_TOKENS.PROJECT_REVIEWER_REPOSITORY,
      useClass: ProjectReviewerRepositoryImpl,
    },
  ],
})
export class ProjectReviewerModule {}