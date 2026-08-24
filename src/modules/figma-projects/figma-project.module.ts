import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens';

import { FigmaProjectController } from './presentation/controllers/figma-project.controller';

import { FigmaProjectTypeormEntity } from './infrastructure/typeorm/figma-project.typeorm.entity';
import { FigmaProjectRepositoryImpl } from './infrastructure/repositories/figma-project.repository.impl';
import { FigmaJsonFileStorageService } from './infrastructure/services/figma-json-file-storage.service';

import { CreateFigmaProjectUseCase } from './application/use-cases/create-figma-project.use-case';
import { CreateFigmaProjectWithFileUseCase } from './application/use-cases/create-figma-project-with-file.use-case';
import { UpdateFigmaProjectUseCase } from './application/use-cases/update-figma-project.use-case';
import { DeleteFigmaProjectUseCase } from './application/use-cases/delete-figma-project.use-case';
import { FindFigmaProjectUseCase } from './application/use-cases/find-figma-project.use-case';
import { FindAllFigmaProjectsUseCase } from './application/use-cases/find-all-figma-projects.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FigmaProjectTypeormEntity,
    ]),
  ],

  controllers: [
    FigmaProjectController,
  ],

  providers: [
    {
      provide: INJECTION_TOKENS.FIGMA_PROJECT_REPOSITORY,
      useClass: FigmaProjectRepositoryImpl,
    },
    {
      // TODO: agrega FIGMA_FILE_STORAGE a shared/constants/injection-tokens.ts
      provide: INJECTION_TOKENS.FIGMA_FILE_STORAGE,
      useClass: FigmaJsonFileStorageService,
    },

    CreateFigmaProjectUseCase,
    CreateFigmaProjectWithFileUseCase,
    UpdateFigmaProjectUseCase,
    DeleteFigmaProjectUseCase,
    FindFigmaProjectUseCase,
    FindAllFigmaProjectsUseCase,
  ],

  exports: [
    INJECTION_TOKENS.FIGMA_PROJECT_REPOSITORY,
  ],
})
export class FigmaProjectModule {}